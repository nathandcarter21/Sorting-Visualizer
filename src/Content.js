import React, { useState, useEffect } from "react";
import Columns from "./Columns";


const Content = () => {
    useEffect(() => {
        setRandomArray();
    }, [])

    let [array, setArray] = useState([])
    let [rendering, setRendering] = useState(false)
    let [scrambled, setScrambled] = useState(true)
    let [time, setTime] = useState(0.0)
    let [swaps, setSwaps] = useState(0)

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const setRandomArray = () => {
        let tempArray = [500]
        for (let i = 0; i < 500; i++) {
            tempArray[i] = i
        }
        for (let i = 0; i < 500; i++) {
            let rand = Math.floor(Math.random() * 500)
            let temp = tempArray[rand]
            tempArray[rand] = tempArray[i]
            tempArray[i] = temp

        }
        setArray(tempArray)
    }

    const RenderVariations = async (variations) => {
        setRendering(true)
        setScrambled(false)

        for (let i = 0; i < variations.length; i++) {
            setArray(variations[i]);
            await sleep(20)
        }
        setRendering(false)
    }

    const BubbleSort = async () => {
        let start = new Date().getTime();
        let variations = []
        let sorted = false
        let countSwaps = 0
        while (!sorted) {
            sorted = true
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    let temp = array[i]
                    array[i] = array[i + 1]
                    array[i + 1] = temp
                    sorted = false
                    countSwaps++
                }
            }
            const tempArray = [...array]
            variations.push(tempArray)
        }
        let end = new Date().getTime();
        setTime((end - start) / 1000)
        setSwaps(countSwaps)
        RenderVariations(variations)
    }

    const MergeSort = async () => {
        let start = new Date().getTime();
        let countSwaps = 0
        const merge = async (nums, left, mid, right) => {
            let i = left;
            let j = mid + 1;
            let k = left;
            let temp = [500]
            while (i <= mid && j <= right) {
                if (nums[i] > nums[j]) {
                    temp[k] = nums[j];
                    j++;
                    k++;
                } else {
                    temp[k] = nums[i];
                    i++;
                    k++;
                }
                countSwaps++
            }
            while (i <= mid) {
                temp[k] = nums[i];
                i++;
                k++;
                countSwaps++
            }
            while (j <= right) {
                temp[k] = nums[j];
                j++;
                k++;
                countSwaps++
            }
            for (let i = left; i < k; i++) {
                nums[i] = temp[i];
            }
            const tempArray = [...nums]
            variations.push(tempArray)
            setSwaps(countSwaps)
        }

        const mergeRec = async (nums, left, right) => {
            if (left < right) {
                let mid = Math.floor((left + right) / 2);
                mergeRec(nums, left, mid);
                mergeRec(nums, mid + 1, right);
                merge(nums, left, mid, right);
            }
        }
        let variations = [];
        mergeRec(array, 0, 499);
        let end = new Date().getTime();
        setTime((end - start) / 1000)
        RenderVariations(variations);
    }

    const QuickSort = () => {
        let start = new Date().getTime();
        let countSwaps = 0
        const partition = (nums, low, high, pivot) => {
            let left = low;
            let right = high;

            let temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
            countSwaps++

            while (low < high) {
                while (nums[left] > nums[low] && low !== high) {
                    low++;
                }
                while (nums[left] < nums[high] && low !== high) {
                    high--;
                }
                if (low < high) {
                    let temp = nums[low]
                    nums[low] = nums[high]
                    nums[high] = temp
                    countSwaps++
                }
            }

            temp = nums[left]
            nums[low] = nums[left]
            nums[low] = left
            countSwaps++
            const tempArray = [...nums];
            variations.push(tempArray)

            return low;
        }

        const sort = (nums, low, high) => {
            if (high - low > 0) {
                let pivot = (low + high) / 2;
                pivot = partition(nums, low, high, pivot);
                sort(nums, low, pivot - 1);
                sort(nums, pivot + 1, high);
            }
        }
        let variations = []
        sort(array, 0, 499)
        let end = new Date().getTime();
        setTime((end - start) / 1000)
        RenderVariations(variations)
        setSwaps(countSwaps)
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
            <h3>Time: {time}s</h3>
            <h3>Swaps: {swaps}</h3>
        </div >
    )
}

export default Content;