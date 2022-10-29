import React, { useState, useEffect } from "react";
import Columns from "./Columns";


const Content = () => {
    useEffect(() => {
        setRandomArray();
    }, [])
    let [array, setArray] = useState([])
    let [rendering, setRendering] = useState(false)
    let [scrambled, setScrambled] = useState(false)
    let [realTime, setRealTime] = useState(0.0)
    let [visualTime, setVisualTime] = useState(0.0)
    let [comparisons, setComparisons] = useState(0)
    let [swaps, setSwaps] = useState(0)
    let [speed, setSpeed] = useState(1)
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
        const colArray = document.getElementsByClassName("col");
        for (let i = 0; i < colArray.length; i++) {
            colArray[i].style.height = `${(tempArray[i] + 1) * 5}px`;
        }
        setArray(tempArray)
        if (colArray.length > 0)
            setScrambled(true)
    }

    const animateColumnsBubble = async (animations) => {
        setRendering(true)
        setScrambled(false)
        setVisualTime(0.0)
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
                await sleep(speed)
                colArray[animations[i][0]].style.backgroundColor = 'black'
                colArray[animations[i][1]].style.backgroundColor = 'black'
                await sleep(speed)
            }
        }
        let end = new Date().getTime();
        setVisualTime(end - start)
        setRendering(false)
        setScrambled(false)
    }

    const BubbleSort = async () => {
        let comparisons = 0
        let swaps = 0
        const tempArray = [...array]
        let animations = []
        let sorted = false
        let start = new Date().getTime();
        while (!sorted) {
            sorted = true
            for (let i = 0; i < tempArray.length - 1; i++) {
                animations.push([i, i + 1])
                comparisons++
                if (tempArray[i] > tempArray[i + 1]) {
                    animations.push([i, i + 1])
                    swaps++
                    let temp = tempArray[i]
                    tempArray[i] = tempArray[i + 1]
                    tempArray[i + 1] = temp
                    sorted = false
                } else {
                    animations.push([-1, -1])
                }

            }
        }
        let end = new Date().getTime();
        setRealTime(end - start)
        animateColumnsBubble(animations)
        setComparisons(comparisons)
        setSwaps(swaps)
    }

    const animateColumnsMerge = async (animations) => {
        setRendering(true)
        setScrambled(false)
        setVisualTime(0.0)
        let start = new Date().getTime();
        const colArray = document.getElementsByClassName("col")
        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === 0) {
                colArray[animations[i][1]].style.backgroundColor = 'red'
                colArray[animations[i][2]].style.backgroundColor = 'red'
                await sleep(speed)
                colArray[animations[i][1]].style.backgroundColor = 'black'
                colArray[animations[i][2]].style.backgroundColor = 'black'
                await sleep(speed)
            }
            else if (animations[i][0] === 1) {
                const newHeight = `${animations[i][2] * 5}px`
                colArray[animations[i][1]].style.height = newHeight;
            }
        }
        setRendering(false)
        let end = new Date().getTime();
        setVisualTime(end - start)
        setScrambled(false)

    }

    const MergeSort = async () => {
        let animations = []
        let comparisons = 0
        let swaps = 0
        const merge = async (nums, left, mid, right) => {
            let i = left;
            let j = mid + 1;
            let k = left;
            let temp = [right - left]
            while (i <= mid && j <= right) {
                comparisons++
                animations.push([0, i, j])
                if (nums[i] > nums[j]) {
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
                swaps++
                animations.push([1, i, temp[i]])
                nums[i] = temp[i];
            }
        }

        const mergeRec = async (nums, left, right) => {
            if (left < right) {
                let mid = Math.floor((left + right) / 2);
                mergeRec(nums, left, mid);
                mergeRec(nums, mid + 1, right);
                merge(nums, left, mid, right);
            }
        }
        let start = new Date().getTime();
        const tempArray = [...array]
        mergeRec(tempArray, 0, 99);
        let end = new Date().getTime();
        setRealTime(end - start)
        animateColumnsMerge(animations)
        setSwaps(swaps)
        setComparisons(comparisons)
    }

    const animateColumnsQuick = async (animations) => {
        setVisualTime(0.0)
        setRendering(true)
        setScrambled(false)
        let start = new Date().getTime();
        const colArray = document.getElementsByClassName("col")
        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === 0) {
                colArray[animations[i][1]].style.backgroundColor = 'red'
                colArray[animations[i][2]].style.backgroundColor = 'red'
                await sleep(speed)
                colArray[animations[i][1]].style.backgroundColor = 'black'
                colArray[animations[i][2]].style.backgroundColor = 'black'
                await sleep(speed)
            }
            else if (animations[i][0] === 1) {
                const tempHeight = colArray[animations[i][1]].style.height;
                colArray[animations[i][1]].style.height = colArray[animations[i][2]].style.height;
                colArray[animations[i][2]].style.height = tempHeight;
            }
        }
        setRendering(false)
        let end = new Date().getTime();
        setVisualTime(end - start)
        setScrambled(false)
    }

    const QuickSort = () => {
        let animations = []
        let comparisons = 0
        let swaps = 0
        const partition = (nums, left, right, pivot) => {
            let pivotVal = nums[pivot]
            let i = left;
            let j = right;

            while (i <= j) {
                while (nums[i] < pivotVal) {
                    animations.push([0, i, pivot])
                    comparisons++
                    i++;
                }
                while (nums[j] > pivotVal) {
                    comparisons++
                    animations.push([0, j, pivot])
                    j--;
                }
                if (i <= j) {
                    if (i !== j) {
                        swaps++
                        animations.push([1, i, j])
                        let temp = nums[i]
                        nums[i] = nums[j]
                        nums[j] = temp
                    }
                    i++;
                    j--;
                }
            }
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
        const temp = [...array]
        let start = new Date().getTime();
        sort(temp, 0, 99)
        let end = new Date().getTime();
        setRealTime(end - start)
        animateColumnsQuick(animations)
        setSwaps(swaps)
        setComparisons(comparisons)
    }

    const Insertion = () => {
        let comparisons = 0
        let swaps = 0
        let start = new Date().getTime();
        const temp = [...array]
        const animations = [];
        let n = temp.length;
        for (let i = 1; i < n; i++) {
            let current = temp[i];
            let j = i - 1;
            while ((j > -1) && (current < temp[j])) {
                comparisons++
                swaps++
                animations.push([0, j, j + 1]);
                animations.push([1, j, j + 1])
                temp[j + 1] = temp[j];
                j--;
            }
            swaps++
            //animations.push([1, i, j + 1])
            temp[j + 1] = current;
        }
        let end = new Date().getTime();
        setRealTime(end - start);
        animateColumnsQuick(animations)
        setSwaps(swaps)
        setComparisons(comparisons)
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
                    Insertion();
                }
            }}>Insertion</button>
            <button className="algorithm" onClick={() => {
                if (scrambled && !rendering) {
                    MergeSort()
                }
            }}>Merge</button>
            <button className="algorithm" onClick={() => {
                if (scrambled && !rendering) {
                    QuickSort()
                }
            }}>Quick</button>
            <input type="number" id="speed" defaultValue='1' />
            <button className="algorithm" onClick={() => {
                if (!rendering) {
                    setRandomArray()
                    setScrambled(true)
                }
                let speed = document.getElementById('speed')
                setSpeed(speed.value)
            }}>Reset Array</button>
            <div className="information-section">
                <div className="info">Real time: {realTime}ms</div>
                <div className="info">Visual time: {visualTime / 1000}s</div>
                <div className="info">Comparisons: {comparisons}</div>
                <div className="info">Swaps: {swaps}</div>
            </div>
        </div >
    )
}

export default Content;