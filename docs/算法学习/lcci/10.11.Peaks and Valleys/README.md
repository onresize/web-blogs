# [面试题 10.11. 峰与谷](https://leetcode.cn/problems/peaks-and-valleys-lcci)

## 题目描述

<!-- 这里写题目描述 -->
<p>在一个整数数组中，&ldquo;峰&rdquo;是大于或等于相邻整数的元素，相应地，&ldquo;谷&rdquo;是小于或等于相邻整数的元素。例如，在数组{5, 8, 6, 2, 3, 4, 6}中，{8, 6}是峰， {5, 2}是谷。现在给定一个整数数组，将该数组按峰与谷的交替顺序排序。</p>
<p><strong>示例:</strong></p>
<pre class="AnLi"><strong>输入: </strong>[5, 3, 1, 2, 3]
<strong>输出:</strong>&nbsp;[5, 1, 3, 2, 3]
</pre>
<p><strong>提示：</strong></p>
<ul>
	<li><code>nums.length &lt;= 10000</code></li>
</ul>

## 解法

### 方法一：排序

我们先对数组进行排序，然后遍历数组，将偶数下标的元素与后一个元素交换即可。

时间复杂度 $O(n \times \log n)$，空间复杂度 $O(\log n)$。其中 $n$ 是数组的长度。

<!-- tabs:start -->

```python
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        nums.sort()
        for i in range(0, len(nums), 2):
            nums[i : i + 2] = nums[i : i + 2][::-1]
```

```java
class Solution {
    public void wiggleSort(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        for (int i = 0; i < n - 1; i += 2) {
            int t = nums[i];
            nums[i] = nums[i + 1];
            nums[i + 1] = t;
        }
    }
}
```

```cpp
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        for (int i = 0; i < n - 1; i += 2) {
            swap(nums[i], nums[i + 1]);
        }
    }
};
```

```go
func wiggleSort(nums []int) {
	sort.Ints(nums)
	for i := 0; i < len(nums)-1; i += 2 {
		nums[i], nums[i+1] = nums[i+1], nums[i]
	}
}
```

```ts
/**
 Do not return anything, modify nums in-place instead.
 */
function wiggleSort(nums: number[]): void {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    for (let i = 0; i < n - 1; i += 2) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
    }
}
```

<!-- tabs:end -->

<!-- end -->
