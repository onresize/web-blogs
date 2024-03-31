# [2673. 使二叉树所有路径值相等的最小代价](https://leetcode.cn/problems/make-costs-of-paths-equal-in-a-binary-tree)

[English Version](/solution/2600-2699/2673.Make%20Costs%20of%20Paths%20Equal%20in%20a%20Binary%20Tree/README_EN.md)

<!-- tags:贪心,树,数组,动态规划,二叉树 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一个整数&nbsp;<code>n</code>&nbsp;表示一棵 <b>满二叉树</b>&nbsp;里面节点的数目，节点编号从 <code>1</code>&nbsp;到 <code>n</code>&nbsp;。根节点编号为 <code>1</code>&nbsp;，树中每个非叶子节点&nbsp;<code>i</code>&nbsp;都有两个孩子，分别是左孩子&nbsp;<code>2 * i</code>&nbsp;和右孩子&nbsp;<code>2 * i + 1</code>&nbsp;。</p>

<p>树中每个节点都有一个值，用下标从<b>&nbsp;0</b>&nbsp;开始、长度为 <code>n</code>&nbsp;的整数数组&nbsp;<code>cost</code>&nbsp;表示，其中&nbsp;<code>cost[i]</code>&nbsp;是第&nbsp;<code>i + 1</code>&nbsp;个节点的值。每次操作，你可以将树中&nbsp;<strong>任意</strong>&nbsp;节点的值&nbsp;<strong>增加</strong>&nbsp;<code>1</code>&nbsp;。你可以执行操作 <strong>任意</strong> 次。</p>

<p>你的目标是让根到每一个 <strong>叶子结点</strong>&nbsp;的路径值相等。请你返回 <strong>最少</strong>&nbsp;需要执行增加操作多少次。</p>

<p><b>注意：</b></p>

<ul>
	<li><strong>满二叉树</strong>&nbsp;指的是一棵树，它满足树中除了叶子节点外每个节点都恰好有 2 个子节点，且所有叶子节点距离根节点距离相同。</li>
	<li><strong>路径值</strong> 指的是路径上所有节点的值之和。</li>
</ul>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2600-2699/2673.Make%20Costs%20of%20Paths%20Equal%20in%20a%20Binary%20Tree/images/binaryytreeedrawio-4.png" /></p>

<pre>
<b>输入：</b>n = 7, cost = [1,5,2,2,3,3,1]
<b>输出：</b>6
<b>解释：</b>我们执行以下的增加操作：
- 将节点 4 的值增加一次。
- 将节点 3 的值增加三次。
- 将节点 7 的值增加两次。
从根到叶子的每一条路径值都为 9 。
总共增加次数为 1 + 3 + 2 = 6 。
这是最小的答案。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2600-2699/2673.Make%20Costs%20of%20Paths%20Equal%20in%20a%20Binary%20Tree/images/binaryytreee2drawio.png" style="width: 205px; height: 151px;" /></p>

<pre>
<b>输入：</b>n = 3, cost = [5,3,3]
<b>输出：</b>0
<b>解释：</b>两条路径已经有相等的路径值，所以不需要执行任何增加操作。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>3 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>n + 1</code> 是&nbsp;<code>2</code>&nbsp;的幂</li>
	<li><code>cost.length == n</code></li>
	<li><code>1 &lt;= cost[i] &lt;= 10<sup>4</sup></code></li>
</ul>

## 解法

### 方法一：贪心

根据题目描述，我们需要计算最小的增加次数，使得根节点到每个叶子节点的路径值相等。

根节点到每个叶子节点的路径值相等，实际上等价于以任意节点为根节点的子树到该子树的每个叶子节点的路径值相等。

为什么呢？我们可以用反证法来证明。假设存在一个节点 $x$，以它为根节点的子树到某个叶子节点的路径值不相等，那么也就存在着根节点到叶子节点的路径值不相等的情况，这与“根节点到每个叶子节点的路径值相等”矛盾。因此假设不成立，以任意节点为根节点的子树到该子树的每个叶子节点的路径值相等。

我们可以从树的底部开始，逐层向上计算增加次数。对于每个非叶子节点，我们可以计算它的左右孩子节点的路径值，增加的次数为两者路径值的差值，然后将左右孩子节点的路径值更新为两者中的较大值。

最后返回总的增加的次数即可。

时间复杂度 $O(n)$，其中 $n$ 为节点数。空间复杂度 $O(1)$。

<!-- tabs:start -->

```python
class Solution:
    def minIncrements(self, n: int, cost: List[int]) -> int:
        ans = 0
        for i in range(n >> 1, 0, -1):
            l, r = i << 1, i << 1 | 1
            ans += abs(cost[l - 1] - cost[r - 1])
            cost[i - 1] += max(cost[l - 1], cost[r - 1])
        return ans
```

```java
class Solution {
    public int minIncrements(int n, int[] cost) {
        int ans = 0;
        for (int i = n >> 1; i > 0; --i) {
            int l = i << 1, r = i << 1 | 1;
            ans += Math.abs(cost[l - 1] - cost[r - 1]);
            cost[i - 1] += Math.max(cost[l - 1], cost[r - 1]);
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int minIncrements(int n, vector<int>& cost) {
        int ans = 0;
        for (int i = n >> 1; i > 0; --i) {
            int l = i << 1, r = i << 1 | 1;
            ans += abs(cost[l - 1] - cost[r - 1]);
            cost[i - 1] += max(cost[l - 1], cost[r - 1]);
        }
        return ans;
    }
};
```

```go
func minIncrements(n int, cost []int) (ans int) {
	for i := n >> 1; i > 0; i-- {
		l, r := i<<1, i<<1|1
		ans += abs(cost[l-1] - cost[r-1])
		cost[i-1] += max(cost[l-1], cost[r-1])
	}
	return
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
```

```ts
function minIncrements(n: number, cost: number[]): number {
    let ans = 0;
    for (let i = n >> 1; i; --i) {
        const [l, r] = [i << 1, (i << 1) | 1];
        ans += Math.abs(cost[l - 1] - cost[r - 1]);
        cost[i - 1] += Math.max(cost[l - 1], cost[r - 1]);
    }
    return ans;
}
```

<!-- tabs:end -->

<!-- end -->
