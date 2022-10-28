import React, { useState, useEffect } from "react";
import Columns from "./Columns";


const Content = () => {
    useEffect(() => {
        setRandomArray();
    }, [])

    let [array, setArray] = useState([])
    let [rendering, setRendering] = useState(false)
    let [scrambled, setScrambled] = useState(true)
    let [realTime, setRealTime] = useState(0.0)
    let [visualTime, setVisualTime] = useState(0.0)
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const setRandomArray = () => {
        let tempArray = [100]
        for (let i = 0; i < 100; i++) {
            tempArray[i] = i + 1
        }
        for (let i = 0; i < 100; i++) {
            let rand = Math.floor(Math.random() * 100)
            let temp = tempArray[rand]
            tempArray[rand] = tempArray[i]
            tempArray[i] = temp

        }
        setArray(tempArray)
        setScrambled(true)
    }

    const RenderVariations = async (variations) => {
        setRendering(true)
        setScrambled(false)

        for (let i = 0; i < variations.length; i++) {
            setArray(variations[i]);
            await sleep(1)
        }
        setRendering(false)
    }

    const animateColumnsBubble = async (animations) => {
        setRendering(true)
        setScrambled(false)
        let start = new Date().getTime();
        const colArray = document.getElementsByClassName("col")
        for (let i = 0; i < animations.length; i++) {
            if (i % 2 === 1) {
                if (animations[i][0] !== -1) {
                    const tempHeight = colArray[animations[i][0]].style.height;
                    colArray[animations[i][0]].style.height = colArray[animations[i][1]].style.height;
                    colArray[animations[i][1]].style.height = tempHeight;
                }
            } else {
                colArray[animations[i][0]].style.backgroundColor = 'red'
                colArray[animations[i][1]].style.backgroundColor = 'red'
                await sleep(1)
                colArray[animations[i][0]].style.backgroundColor = 'black'
                colArray[animations[i][1]].style.backgroundColor = 'black'
                await sleep(1)
            }
        }
        for (let i = 0; i < colArray.length; i++) {
            colArray[i].style.backgroundColor = 'red'
            await sleep(2)
            colArray[i].style.backgroundColor = 'black'
            await sleep(2)

        }
        let end = new Date().getTime();
        setVisualTime(end - start)
        setRendering(false)
        setScrambled(false)
    }

    const BubbleSort = async () => {
        const tempArray = [...array]
        let variations = []
        let animations = []
        let sorted = false
        let start = new Date().getTime();
        while (!sorted) {
            sorted = true
            for (let i = 0; i < tempArray.length - 1; i++) {
                animations.push([i, i + 1])
                if (tempArray[i] > tempArray[i + 1]) {
                    animations.push([i, i + 1])
                    let temp = tempArray[i]
                    tempArray[i] = tempArray[i + 1]
                    tempArray[i + 1] = temp
                    sorted = false
                } else {
                    animations.push([-1, -1])
                }

            }
            // const tempArray = [...array]
            // variations.push(tempArray)
        }
        let end = new Date().getTime();
        setRealTime(end - start)
        //RenderVariations(variations)
        animateColumnsBubble(animations)
    }

    const animateColumnsMerge = async (animations) => {
        setRendering(true)
        setScrambled(false)
        let start = new Date().getTime();
        const colArray = document.getElementsByClassName("col")
        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === 0) {
                colArray[animations[i][1]].style.backgroundColor = 'red'
                colArray[animations[i][2]].style.backgroundColor = 'red'
                await sleep(5)
                colArray[animations[i][1]].style.backgroundColor = 'black'
                colArray[animations[i][2]].style.backgroundColor = 'black'
                await sleep(5)
            }
            else if (animations[i][0] === 1) {
                const newHeight = `${animations[i][2] * 5}px`
                colArray[animations[i][1]].style.height = newHeight;
            }
        }
        for (let i = 0; i < colArray.length; i++) {
            colArray[i].style.backgroundColor = 'red'
            await sleep(2)
            colArray[i].style.backgroundColor = 'black'
            await sleep(2)

        }
        setRendering(false)
        let end = new Date().getTime();
        setVisualTime(end - start)
        setScrambled(false)

    }
    const animateColumnsQuick = async (animations) => {
        setRendering(true)
        setScrambled(false)
        let start = new Date().getTime();
        const colArray = document.getElementsByClassName("col")
        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === 0) {
                colArray[animations[i][1]].style.backgroundColor = 'red'
                colArray[animations[i][2]].style.backgroundColor = 'red'
                await sleep(10)
                colArray[animations[i][1]].style.backgroundColor = 'black'
                colArray[animations[i][2]].style.backgroundColor = 'black'
                await sleep(10)
            }
            else if (animations[i][0] === 1) {
                const tempHeight = colArray[animations[i][1]].style.height;
                colArray[animations[i][1]].style.height = colArray[animations[i][2]].style.height;
                colArray[animations[i][2]].style.height = tempHeight;
            }
        }
        for (let i = 0; i < colArray.length; i++) {
            colArray[i].style.backgroundColor = 'red'
            await sleep(2)
            colArray[i].style.backgroundColor = 'black'
            await sleep(2)

        }
        setRendering(false)
        let end = new Date().getTime();
        setVisualTime(end - start)
        setScrambled(false)

    }

    const MergeSort = async () => {
        let animations = []
        const merge = async (nums, left, mid, right) => {
            let i = left;
            let j = mid + 1;
            let k = left;
            let temp = [right - left]
            while (i <= mid && j <= right) {
                animations.push([0, i, j])
                if (nums[i] > nums[j]) {
                    // animations.push([1, i, j])
                    temp[k] = nums[j];
                    j++;
                    k++;
                } else {
                    animations.push([-1, -1, -1])
                    temp[k] = nums[i];
                    i++;
                    k++;
                }
            }
            while (i <= mid) {
                temp[k] = nums[i];
                i++;
                k++;
            }
            while (j <= right) {
                temp[k] = nums[j];
                j++;
                k++;
            }
            for (let i = left; i < k; i++) {
                animations.push([1, i, temp[i]])
                nums[i] = temp[i];
            }
            // const tempArray = [...nums]
            // variations.push(tempArray)
        }

        const mergeRec = async (nums, left, right) => {
            if (left < right) {
                let mid = Math.floor((left + right) / 2);
                mergeRec(nums, left, mid);
                mergeRec(nums, mid + 1, right);
                merge(nums, left, mid, right);
            }
        }
        //let variations = [];
        let start = new Date().getTime();
        const tempArray = [...array]
        mergeRec(tempArray, 0, 99);
        let end = new Date().getTime();
        setRealTime(end - start)
        animateColumnsMerge(animations)
        //RenderVariations(variations);
    }

    const QuickSort = () => {
        // const partition = (nums, low, high, pivot) => {
        //     let left = low;
        //     let right = high;

        //     let temp = nums[left]
        //     nums[left] = nums[right]
        //     nums[right] = temp

        //     while (low < high) {
        //         while (nums[left] > nums[low] && low !== high) {
        //             low++;
        //         }
        //         while (nums[left] < nums[high] && low !== high) {
        //             high--;
        //         }
        //         if (low < high) {
        //             let temp = nums[low]
        //             nums[low] = nums[high]
        //             nums[high] = temp
        //         }
        //     }

        //     temp = nums[left]
        //     nums[low] = nums[left]
        //     nums[low] = left

        //     const tempArray = [...nums]
        //     variations.push(tempArray)
        //     return low;
        // }

        // const sort = (nums, low, high) => {
        //     if (high - low > 0) {
        //         let pivot = (low + high) / 2;
        //         pivot = partition(nums, low, high, pivot);
        //         sort(nums, low, pivot - 1);
        //         sort(nums, pivot + 1, high);
        //     }
        // }

        //let variations = []
        //variations.push(sort(array, 0, 49))
        //RenderVariations(variations)
        let animations = []
        const partition = (nums, left, right, pivot) => {
            let pivotVal = nums[pivot]
            let i = left;
            let j = right;


            while (i <= j) {
                animations.push([0, i, pivot])
                while (nums[i] < pivotVal) {
                    i++;
                }
                animations.push([0, j, pivot])
                while (nums[j] > pivotVal) {
                    j--;
                }
                if (i <= j) {
                    animations.push([1, j, i])
                    let temp = nums[i]
                    nums[i] = nums[j]
                    nums[j] = temp
                    i++;
                    j--;
                }
            }
            variations.push([...nums])
            return i;
        }

        const sort = (nums, left, right) => {
            if (right - left > 0) {
                let pivot = Math.floor((left + right) / 2)
                pivot = partition(nums, left, right, pivot)
                sort(nums, left, pivot - 1)
                sort(nums, pivot, right)
            }
        }
        let variations = []
        const temp = [...array]
        let start = new Date().getTime();

        sort(temp, 0, 99)
        let end = new Date().getTime();
        setRealTime(end - start)
        // RenderVariations(variations)
        animateColumnsQuick(animations)
    }

    return (
        <div className="container">
            <Columns array={array} />
            <button className="algorithm" onClick={() => {
                if (scrambled && !rendering) {
                    BubbleSort()
                }
            }}>Bubble</button>
            <button className="algorithm" onClick={() => {
                if (scrambled && !rendering) {
                    MergeSort()
                }
            }}>Merge</button>
            <button className="algorithm" onClick={() => {
                if (scrambled && !rendering) {
                    QuickSort()
                }
            }}>Quicksort</button>
            <button className="algorithm" onClick={() => {
                if (!rendering) {
                    setRandomArray()
                    setScrambled(true)
                }
            }}>Scramble</button>
            <h3>Real time: {realTime / 1000}</h3>
            <h3>Visual time: {visualTime / 1000}</h3>
        </div >
    )
}

export default Content;