import { WordGraph } from './word-graph';
import { Node } from './node';

export class MinimalWordGraph extends WordGraph {
  private lastWordAdded: any = '';
  private registry: any = {};
  private immutableSize: any;

  add(word: string) {
    super.add(word);

    if (this.isImmutable()) {
      throw 'This MinimalWordGraph(DAWG) is immutable and words may no longer be added to it.';
    }
    if (this.lastWordAdded && word < this.lastWordAdded) {
      throw `Words need to be added in lexicographical order. ${word} after ${this.lastWordAdded}`;
    }

    let { node: node, index: index } = this.climbUntilEmpty(word);

    if (
      this.lastWordAdded &&
      index < this.lastWordAdded.length &&
      this.lastWordAdded !== ''
    ) {
      let minimizedNode = this.minimize(
        node.nodeOf(this.lastWordAdded[index]),
        this.lastWordAdded.substr(index + 1),
      );

      node.addState(minimizedNode, this.lastWordAdded[index]);
    }

    for (index; index < word.length; index++) {
      let newNode = new Node();
      node.addState(newNode, word[index]);
      node = newNode;
    }

    node.final = true;

    this.lastWordAdded = word;
  }

  minimize(node: Node, word: string) {
    if (word !== '') {
      let minimizedChild = this.minimize(
        node.nodeOf(word[0]),
        word.substr(1),
      );

      node.addState(minimizedChild, word[0]);
    }

    let rightLanguage = node.signatureToString();
    let registeredNode = this.registry[rightLanguage];

    if (!registeredNode) {
      this.registry[rightLanguage] = node;
      registeredNode = node;
    }

    return registeredNode;
  }

  size(): number {
    return this.isImmutable() && this.immutableSize
      ? this.immutableSize
      : super.size();
  }

  makeImmutable(): void {
    this.minimize(this.root, this.lastWordAdded);

    this.lastWordAdded = null;
    this.registry = null;

    this.immutableSize = super.size();
  }

  isImmutable(): boolean {
    return this.registry === null;
  }

  private climbUntilEmpty(word: string): {
    node: Node;
    index: number;
  } {
    let node = this._root;
    let index = 0;

    for (index; index < word.length; index++) {
      let nextNode = node.nodeOf(word[index]);

      if (nextNode) {
        node = nextNode;
      } else {
        break;
      }
    }

    return { node: node, index: index };
  }
}
