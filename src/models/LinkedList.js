import Node from "./Node.js"
class LinkedList {
  #head
  count
  constructor() {
    this.#head = null
    this.count = 0
  }

  add(value) {
    let node = new Node(value)
    if (this.#head == null) {
      this.#head = node
    }
    else {
      let current = this.#head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.count = this.count + 1
  }

  //Ordenamiento burbuja
  bubbleSort() {
    if (this.head == null) return;

    let swapped;
    let current;
    do {
      swapped = false;
      current = this.head;

      while (current.next != null) {
        if (current.value > current.next.value) {
          let temp = current.value;
          current.value = current.next.value;
          current.next.value = temp;
          swapped = true;
        }
        current = current.next;
      }
    } while (swapped);
  }

  //Ordenamiento merge
  mergeSort() {
    this.head = this.#mergeSortRec(this.head);
  }

  #mergeSortRec(head) {
    if (head == null || head.next == null) {
      return head;
    }

    const middle = this.#getMiddle(head);
    const nextOfMiddle = middle.next;

    middle.next = null;

    const left = this.#mergeSortRec(head);
    const right = this.#mergeSortRec(nextOfMiddle);

    return this.#sortedMerge(left, right);
  }

  #getMiddle(head) {
    if (!head) return head;

    let slow = head;
    let fast = head;

    while (fast.next !== null && fast.next.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  #sortedMerge(a, b) {
    if (!a) return b;
    if (!b) return a;

    let result;
    if (a.value <= b.value) {
      result = a;
      result.next = this.#sortedMerge(a.next, b);
    } else {
      result = b;
      result.next = this.#sortedMerge(a, b.next);
    }
    return result;
  }

  radixSort() {
    const max = this.#getMax();
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      this.#countSort(exp);
    }
  }

  #getMax() {
    let max = this.head.value;
    let current = this.head.next;

    while (current) {
      if (current.value > max) {
        max = current.value;
      }
      current = current.next;
    }
    return max;
  }

  #countSort(exp) {
    const output = new Array(this.size);
    const count = new Array(10).fill(0);

    let current = this.head;
    while (current) {
      count[Math.floor(current.value / exp) % 10]++;
      current = current.next;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    current = this.head;
    while (current) {
      output[count[Math.floor(current.value / exp) % 10] - 1] = current.value;
      count[Math.floor(current.value / exp) % 10]--;
      current = current.next;
    }

    current = this.head;
    for (let i = 0; i < this.size; i++) {
      current.value = output[i];
      current = current.next;
    }
  }

  searchLinkedList(target) {
    let current = this.head
    while (current) {
      if (current.value === target) {
        return current.value
      }
      current = current.next;
    }
    return null;
  }
}

export default LinkedList