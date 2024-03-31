# [2831. 找出最长等值子数组](https://leetcode.cn/problems/find-the-longest-equal-subarray)

[English Version](/solution/2800-2899/2831.Find%20the%20Longest%20Equal%20Subarray/README_EN.md)

<!-- tags:数组,哈希表,二分查找,滑动窗口 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> 和一个整数 <code>k</code> 。</p>

<p>如果子数组中所有元素都相等，则认为子数组是一个 <strong>等值子数组</strong> 。注意，空数组是 <strong>等值子数组</strong> 。</p>

<p>从 <code>nums</code> 中删除最多 <code>k</code> 个元素后，返回可能的最长等值子数组的长度。</p>

<p><strong>子数组</strong> 是数组中一个连续且可能为空的元素序列。</p>

<p>&nbsp;</p>

<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,3,2,3,1,3], k = 3
<strong>输出：</strong>3
<strong>解释：</strong>最优的方案是删除下标 2 和下标 4 的元素。
删除后，nums 等于 [1, 3, 3, 3] 。
最长等值子数组从 i = 1 开始到 j = 3 结束，长度等于 3 。
可以证明无法创建更长的等值子数组。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,2,2,1,1], k = 2
<strong>输出：</strong>4
<strong>解释：</strong>最优的方案是删除下标 2 和下标 3 的元素。 
删除后，nums 等于 [1, 1, 1, 1] 。 
数组自身就是等值子数组，长度等于 4 。 
可以证明无法创建更长的等值子数组。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= nums.length</code></li>
	<li><code>0 &lt;= k &lt;= nums.length</code></li>
</ul>

## 解法

### 方法一：哈希表 + 双指针

我们用双指针维护一个单调变长的窗口，用哈希表维护窗口中每个元素出现的次数。

窗口中的所有元素个数减去窗口中出现次数最多的元素个数，就是窗口中需要删除的元素个数。

每一次，我们将右指针指向的元素加入窗口，然后更新哈希表，同时更新窗口中出现次数最多的元素个数。当窗口中需要删除的元素个数超过了 $k$ 时，我们就移动一次左指针，然后更新哈希表。

遍历结束后，返回出现次数最多的元素个数即可。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是数组的长度。

<!-- tabs:start -->

```python
class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        cnt = Counter()
        l = 0
        mx = 0
        for r, x in enumerate(nums):
            cnt[x] += 1
            mx = max(mx, cnt[x])
            if r - l + 1 - mx > k:
                cnt[nums[l]] -= 1
                l += 1
        return mx
```

```java
class Solution {
    public int longestEqualSubarray(List<Integer> nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>();
        int mx = 0, l = 0;
        for (int r = 0; r < nums.size(); ++r) {
            cnt.merge(nums.get(r), 1, Integer::sum);
            mx = Math.max(mx, cnt.get(nums.get(r)));
            if (r - l + 1 - mx > k) {
                cnt.merge(nums.get(l++), -1, Integer::sum);
            }
        }
        return mx;
    }
}
```

```cpp
class Solution {
public:
    int longestEqualSubarray(vector<int>& nums, int k) {
        unordered_map<int, int> cnt;
        int mx = 0, l = 0;
        for (int r = 0; r < nums.size(); ++r) {
            mx = max(mx, ++cnt[nums[r]]);
            if (r - l + 1 - mx > k) {
                --cnt[nums[l++]];
            }
        }
        return mx;
    }
};
```

```go
func longestEqualSubarray(nums []int, k int) int {
	cnt := map[int]int{}
	mx, l := 0, 0
	for r, x := range nums {
		cnt[x]++
		mx = max(mx, cnt[x])
		if r-l+1-mx > k {
			cnt[nums[l]]--
			l++
		}
	}
	return mx
}
```

```ts
function longestEqualSubarray(nums: number[], k: number): number {
    const cnt: Map<number, number> = new Map();
    let mx = 0;
    let l = 0;
    for (let r = 0; r < nums.length; ++r) {
        cnt.set(nums[r], (cnt.get(nums[r]) ?? 0) + 1);
        mx = Math.max(mx, cnt.get(nums[r])!);
        if (r - l + 1 - mx > k) {
            cnt.set(nums[l], cnt.get(nums[l])! - 1);
            ++l;
        }
    }
    return mx;
}
```

<!-- tabs:end -->

<!-- end -->
