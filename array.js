const Memory = require("./memory.js");
let Mem = new Memory();
class Array {
     constructor() {
         this.length = 0;
         this._capacity = 0;
         this.ptr = Mem.allocate(this.length);
     }
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        Mem.set(this.ptr + this.length, value);
        this.length++;
    }
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = Mem.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        Mem.copy(this.ptr, oldPtr, this.length);
        Mem.free(oldPtr);
        this._capacity = size;
    }
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return Mem.get(this.ptr + index);
    }
    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Mem.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        Mem.set(this.ptr + index, value);
        this.length++;
    }
    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = Mem.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        Mem.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3); //length = 1, cap = 3, ptr = 0
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10); //len = 6, cap = 12, ptr = 3, length is 6 b/c 5 #s were pushed onto arr when there was already 1 # in arr. Cap is now 12 b/c the size ratio was applied everytime the length was >= cap.
    arr.pop();
    arr.pop();
    arr.pop(); //everything stays the same but takes the last 3 elements of the array off, only affecting the length by -3

    //console.log(arr.get(0));
    
    arr.remove(2);
    arr.remove(1);
    arr.remove(0);
    arr.push('tauhida')
    //console.log(arr.get(0)) //return 'NaN' since the string that was inserted was not an integer 
    // _resize() makes sure there's always enough space in the array. If not then it 
    //console.log(arr);

    function replace(string){
        let newStr = []
        let final = ''
        for(let i = 0; i<string.length;i++){
            if(string[i] === ' '){
                newStr[newStr.length] = '%20';
            } else {
                newStr[newStr.length] = string[i]
            }
        } 
        for(let i = 0; i<newStr.length;i++){
            final += newStr[i];
        }
        return final;
    }
    //let str = 'tauhida parveen'
    //console.log(replace(str))
    // 6. filter array without .filter() -- done
    // 7. Max sum 
    function maxSum(arr) {
        let currentSum = 0;
        let largestSum = 0;
      
        for (let i = 0; i < arr.length; i++) {
          currentSum += arr[i];
      
          if (currentSum > currentSum + arr[i + 1]) {
            largestSum = currentSum;
          }
        }
        return largestSum;
      }
      
      //maxSum([4, 6, -3, 5, -2, 1]);

    // 8. Merge arrays
function mergeArrays(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr1.length; i++) {
      newArr.push(arr1[i]);
    }
    for (let i = 0; i < arr2.length; i++) {
      newArr.push(arr2[i]);
    }
  
    return newArr.sort((a, b) => a - b);
  }
  
  //mergeArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]);
  function removeCharacter(string, [...characters]) {
    let newStr = '';
  
    for (let i = 0; i < string.length; i++) {
      let char = string[i].toLowerCase();
      if (characters.indexOf(char) < 0) {
        newStr = newStr + char;
      }
    }
    return newStr;
  }

  //removeCharacter('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou');

  function products(arr) {
    let newArr = [];
    let value = 1;
  
    for (let i = 0; i < arr.length; i++) {
      value = value * arr[i];
      // newArr.push(value / arr[i]);
    }
  
    for (let j = 0; j < arr.length; j++) {
      newArr.push(value / arr[j]);
    }
    return newArr;
  }
  
  products([1, 3, 9, 4]);
}

main();
