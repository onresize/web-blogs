# [2826. 将三个组排序](https://leetcode.cn/problems/sorting-three-groups)

[English Version](/solution/2800-2899/2826.Sorting%20Three%20Groups/README_EN.md)

<!-- tags:数组,二分查找,动态规划 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一个下标从 <strong>0</strong>&nbsp;开始长度为 <code>n</code>&nbsp;的整数数组&nbsp;<code>nums</code>&nbsp;。<br />
<br />
从&nbsp;<code>0</code>&nbsp;到&nbsp;<code>n - 1</code>&nbsp;的数字被分为编号从&nbsp;<code>1</code>&nbsp;到&nbsp;<code>3</code>&nbsp;的三个组，数字&nbsp;<code>i</code>&nbsp;属于组&nbsp;<code>nums[i]</code>&nbsp;。注意，有的组可能是&nbsp;<strong>空的</strong>&nbsp;。<br />
<br />
你可以执行以下操作任意次：</p>

<ul>
	<li>选择数字&nbsp;<code>x</code>&nbsp;并改变它的组。更正式的，你可以将&nbsp;<code>nums[x]</code>&nbsp;改为数字&nbsp;<code>1</code>&nbsp;到&nbsp;<code>3</code>&nbsp;中的任意一个。</li>
</ul>

<p>你将按照以下过程构建一个新的数组&nbsp;<code>res</code>&nbsp;：</p>

<ol>
	<li>将每个组中的数字分别排序。</li>
	<li>将组&nbsp;<code>1</code>&nbsp;，<code>2</code>&nbsp;和&nbsp;<code>3</code>&nbsp;中的元素&nbsp;<strong>依次</strong>&nbsp;连接以得到&nbsp;<code>res</code>&nbsp;。</li>
</ol>

<p>如果得到的&nbsp;<code>res</code>&nbsp;是 <strong>非递减</strong>顺序的，那么我们称数组&nbsp;<code>nums</code>&nbsp;是 <strong>美丽数组</strong>&nbsp;。</p>

<p>请你返回将<em>&nbsp;</em><code>nums</code>&nbsp;变为&nbsp;<strong>美丽数组</strong>&nbsp;需要的最少步数。</p>

<p>&nbsp;</p>

<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [2,1,3,2,1]
<b>输出：</b>3
<b>解释：</b>以下三步操作是最优方案：
1. 将 nums[0] 变为 1 。
2. 将 nums[2] 变为 1 。
3. 将 nums[3] 变为 1 。
执行以上操作后，将每组中的数字排序，组 1 为 [0,1,2,3,4] ，组 2 和组 3 都为空。所以 res 等于 [0,1,2,3,4] ，它是非递减顺序的。
三步操作是最少需要的步数。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [1,3,2,1,3,3]
<b>输出：</b>2
<b>解释：</b>以下两步操作是最优方案：
1. 将 nums[1] 变为 1 。
2. 将 nums[2] 变为 1 。
执行以上操作后，将每组中的数字排序，组 1 为 [0,1,2,3] ，组 2 为空，组 3 为 [4,5] 。所以 res 等于 [0,1,2,3,4,5] ，它是非递减顺序的。
两步操作是最少需要的步数。
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<b>输入：</b>nums = [2,2,2,2,3,3]
<b>输出：</b>0
<b>解释：</b>不需要执行任何操作。
组 1 为空，组 2 为 [0,1,2,3] ，组 3 为 [4,5] 。所以 res 等于 [0,1,2,3,4,5] ，它是非递减顺序的。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 100</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 3</code></li>
</ul>

## 解法

### 方法一：动态规划

我们定义 $f[i][j]$ 表示将前 $i$ 个数变成美丽数组，并且第 $i$ 个数变成 $j+1$ 的最少操作次数。那么答案就是 $\min(f[n][0], f[n][1], f[n][2])$。

我们可以枚举第 $i$ 个数变成 $j+1$ 的所有情况，然后取最小值。这里我们可以用滚动数组优化空间复杂度。

时间复杂度 $O(n)$，其中 $n$ 是数组的长度。空间复杂度 $O(1)$。

<!-- tabs:start -->

```python
class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        f = g = h = 0
        for x in nums:
            ff = gg = hh = 0
            if x == 1:
                ff = f
                gg = min(f, g) + 1
                hh = min(f, g, h) + 1
            elif x == 2:
                ff = f + 1
                gg = min(f, g)
                hh = min(f, g, h) + 1
            else:
                ff = f + 1
                gg = min(f, g) + 1
                hh = min(f, g, h)
            f, g, h = ff, gg, hh
        return min(f, g, h)
```

```java
class Solution {
    public int minimumOperations(List<Integer> nums) {
        int[] f = new int[3];
        for (int x : nums) {
            int[] g = new int[3];
            if (x == 1) {
                g[0] = f[0];
                g[1] = Math.min(f[0], f[1]) + 1;
                g[2] = Math.min(f[0], Math.min(f[1], f[2])) + 1;
            } else if (x == 2) {
                g[0] = f[0] + 1;
                g[1] = Math.min(f[0], f[1]);
                g[2] = Math.min(f[0], Math.min(f[1], f[2])) + 1;
            } else {
                g[0] = f[0] + 1;
                g[1] = Math.min(f[0], f[1]) + 1;
                g[2] = Math.min(f[0], Math.min(f[1], f[2]));
            }
            f = g;
        }
        return Math.min(f[0], Math.min(f[1], f[2]));
    }
}
```

```cpp
class Solution {
public:
    int minimumOperations(vector<int>& nums) {
        vector<int> f(3);
        for (int x : nums) {
            vector<int> g(3);
            if (x == 1) {
                g[0] = f[0];
                g[1] = min(f[0], f[1]) + 1;
                g[2] = min({f[0], f[1], f[2]}) + 1;
            } else if (x == 2) {
                g[0] = f[0] + 1;
                g[1] = min(f[0], f[1]);
                g[2] = min(f[0], min(f[1], f[2])) + 1;
            } else {
                g[0] = f[0] + 1;
                g[1] = min(f[0], f[1]) + 1;
                g[2] = min(f[0], min(f[1], f[2]));
            }
            f = move(g);
        }
        return min({f[0], f[1], f[2]});
    }
};
```

```go
func minimumOperations(nums []int) int {
	f := make([]int, 3)
	for _, x := range nums {
		g := make([]int, 3)
		if x == 1 {
			g[0] = f[0]
			g[1] = min(f[0], f[1]) + 1
			g[2] = min(f[0], min(f[1], f[2])) + 1
		} else if x == 2 {
			g[0] = f[0] + 1
			g[1] = min(f[0], f[1])
			g[2] = min(f[0], min(f[1], f[2])) + 1
		} else {
			g[0] = f[0] + 1
			g[1] = min(f[0], f[1]) + 1
			g[2] = min(f[0], min(f[1], f[2]))
		}
		f = g
	}
	return min(f[0], min(f[1], f[2]))
}
```

```ts
function minimumOperations(nums: number[]): number {
    let f: number[] = new Array(3).fill(0);
    for (const x of nums) {
        const g: number[] = new Array(3).fill(0);
        if (x === 1) {
            g[0] = f[0];
            g[1] = Math.min(f[0], f[1]) + 1;
            g[2] = Math.min(f[0], Math.min(f[1], f[2])) + 1;
        } else if (x === 2) {
            g[0] = f[0] + 1;
            g[1] = Math.min(f[0], f[1]);
            g[2] = Math.min(f[0], Math.min(f[1], f[2])) + 1;
        } else {
            g[0] = f[0] + 1;
            g[1] = Math.min(f[0], f[1]) + 1;
            g[2] = Math.min(f[0], Math.min(f[1], f[2]));
        }
        f = g;
    }
    return Math.min(...f);
}
```

<!-- tabs:end -->

### 方法二

<!-- tabs:start -->

```python
class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        f = [0] * 3
        for x in nums:
            g = [0] * 3
            if x == 1:
                g[0] = f[0]
                g[1] = min(f[:2]) + 1
                g[2] = min(f) + 1
            elif x == 2:
                g[0] = f[0] + 1
                g[1] = min(f[:2])
                g[2] = min(f) + 1
            else:
                g[0] = f[0] + 1
                g[1] = min(f[:2]) + 1
                g[2] = min(f)
            f = g
        return min(f)
```

<!-- tabs:end -->

<!-- end -->
