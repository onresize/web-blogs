# [2872. 可以被 K 整除连通块的最大数目](https://leetcode.cn/problems/maximum-number-of-k-divisible-components/)

[English Version](/solution/2800-2899/2872.Maximum%20Number%20of%20K-Divisible%20Components/README_EN.md)

<!-- tags:树,深度优先搜索 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一棵 <code>n</code>&nbsp;个节点的无向树，节点编号为&nbsp;<code>0</code>&nbsp;到&nbsp;<code>n - 1</code>&nbsp;。给你整数&nbsp;<code>n</code>&nbsp;和一个长度为 <code>n - 1</code>&nbsp;的二维整数数组&nbsp;<code>edges</code>&nbsp;，其中&nbsp;<code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code>&nbsp;表示树中节点&nbsp;<code>a<sub>i</sub></code> 和&nbsp;<code>b<sub>i</sub></code>&nbsp;有一条边。</p>

<p>同时给你一个下标从 <strong>0</strong>&nbsp;开始长度为 <code>n</code>&nbsp;的整数数组&nbsp;<code>values</code>&nbsp;，其中&nbsp;<code>values[i]</code>&nbsp;是第 <code>i</code>&nbsp;个节点的 <strong>值</strong>&nbsp;。再给你一个整数&nbsp;<code>k</code>&nbsp;。</p>

<p>你可以从树中删除一些边，也可以一条边也不删，得到若干连通块。一个 <strong>连通块的值</strong> 定义为连通块中所有节点值之和。如果所有连通块的值都可以被 <code>k</code>&nbsp;整除，那么我们说这是一个 <strong>合法分割</strong>&nbsp;。</p>

<p>请你返回所有合法分割中，<b>连通块数目的最大值</b>&nbsp;。</p>

<p>&nbsp;</p>

<p><strong class="example">示例 1：</strong></p>

<p><img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2800-2899/2872.Maximum%20Number%20of%20K-Divisible%20Components/images/example12-cropped2svg.jpg" style="width: 1024px; height: 453px;" /></p>

<pre>
<b>输入：</b>n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
<b>输出：</b>2
<b>解释：</b>我们删除节点 1 和 2 之间的边。这是一个合法分割，因为：
- 节点 1 和 3 所在连通块的值为 values[1] + values[3] = 12 。
- 节点 0 ，2 和 4 所在连通块的值为 values[0] + values[2] + values[4] = 6 。
最多可以得到 2 个连通块的合法分割。</pre>

<p><strong class="example">示例 2：</strong></p>

<p><img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2800-2899/2872.Maximum%20Number%20of%20K-Divisible%20Components/images/example21svg-1.jpg" style="width: 999px; height: 338px;" /></p>

<pre>
<b>输入：</b>n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
<b>输出：</b>3
<b>解释：</b>我们删除节点 0 和 2 ，以及节点 0 和 1 之间的边。这是一个合法分割，因为：
- 节点 0 的连通块的值为 values[0] = 3 。
- 节点 2 ，5 和 6 所在连通块的值为 values[2] + values[5] + values[6] = 9 。
- 节点 1 ，3 和 4 的连通块的值为 values[1] + values[3] + values[4] = 6 。
最多可以得到 3 个连通块的合法分割。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>edges.length == n - 1</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; n</code></li>
	<li><code>values.length == n</code></li>
	<li><code>0 &lt;= values[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
	<li><code>values</code>&nbsp;之和可以被 <code>k</code>&nbsp;整除。</li>
	<li>输入保证&nbsp;<code>edges</code>&nbsp;是一棵无向树。</li>
</ul>

## 解法

### 方法一：DFS

我们注意到，题目保证了整棵树的节点值之和可以被 $k$ 整除，因此，如果我们删除一棵元素和能被 $k$ 整除的边，那么剩下的每个连通块的节点值之和也一定可以被 $k$ 整除。

因此，我们可以使用深度优先搜索的方法，从根节点开始遍历整棵树，对于每个节点，我们计算其子树中所有节点值之和，如果该和能被 $k$ 整除，那么我们就将答案加一。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 是树中的节点数。

<!-- tabs:start -->

```python
class Solution:
    def maxKDivisibleComponents(
        self, n: int, edges: List[List[int]], values: List[int], k: int
    ) -> int:
        def dfs(i: int, fa: int) -> int:
            s = values[i]
            for j in g[i]:
                if j != fa:
                    s += dfs(j, i)
            nonlocal ans
            ans += s % k == 0
            return s

        g = [[] for _ in range(n)]
        for a, b in edges:
            g[a].append(b)
            g[b].append(a)
        ans = 0
        dfs(0, -1)
        return ans
```

```java
class Solution {
    private int ans;
    private List<Integer>[] g;
    private int[] values;
    private int k;

    public int maxKDivisibleComponents(int n, int[][] edges, int[] values, int k) {
        g = new List[n];
        Arrays.setAll(g, i -> new ArrayList<>());
        for (int[] e : edges) {
            int a = e[0], b = e[1];
            g[a].add(b);
            g[b].add(a);
        }
        this.values = values;
        this.k = k;
        dfs(0, -1);
        return ans;
    }

    private long dfs(int i, int fa) {
        long s = values[i];
        for (int j : g[i]) {
            if (j != fa) {
                s += dfs(j, i);
            }
        }
        ans += s % k == 0 ? 1 : 0;
        return s;
    }
}
```

```cpp
class Solution {
public:
    int maxKDivisibleComponents(int n, vector<vector<int>>& edges, vector<int>& values, int k) {
        int ans = 0;
        vector<int> g[n];
        for (auto& e : edges) {
            int a = e[0], b = e[1];
            g[a].push_back(b);
            g[b].push_back(a);
        }
        function<long long(int, int)> dfs = [&](int i, int fa) {
            long long s = values[i];
            for (int j : g[i]) {
                if (j != fa) {
                    s += dfs(j, i);
                }
            }
            ans += s % k == 0;
            return s;
        };
        dfs(0, -1);
        return ans;
    }
};
```

```go
func maxKDivisibleComponents(n int, edges [][]int, values []int, k int) (ans int) {
	g := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		g[a] = append(g[a], b)
		g[b] = append(g[b], a)
	}
	var dfs func(int, int) int
	dfs = func(i, fa int) int {
		s := values[i]
		for _, j := range g[i] {
			if j != fa {
				s += dfs(j, i)
			}
		}
		if s%k == 0 {
			ans++
		}
		return s
	}
	dfs(0, -1)
	return
}
```

```ts
function maxKDivisibleComponents(
    n: number,
    edges: number[][],
    values: number[],
    k: number,
): number {
    const g: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        g[a].push(b);
        g[b].push(a);
    }
    let ans = 0;
    const dfs = (i: number, fa: number): number => {
        let s = values[i];
        for (const j of g[i]) {
            if (j !== fa) {
                s += dfs(j, i);
            }
        }
        if (s % k === 0) {
            ++ans;
        }
        return s;
    };
    dfs(0, -1);
    return ans;
}
```

<!-- tabs:end -->

### 方法二

<!-- tabs:start -->

```java
class Solution {
    int n, k;
    int[] values;
    int[] dfs(int curr, int parent, List<List<Integer>> adj) {
        int[] res = new int[] {0, values[curr] % k};
        for (int next : adj.get(curr)) {
            if (next == parent) {
                continue;
            }
            int[] update = dfs(next, curr, adj);
            res[0] += update[0];
            res[1] += update[1];
        }
        res[1] %= k;
        res[0] += res[1] == 0 ? 1 : 0;
        return res;
    }
    public int maxKDivisibleComponents(int n, int[][] edges, int[] values, int k) {
        this.n = n;
        this.k = k;
        this.values = values;
        List<List<Integer>> adj = new ArrayList<>();
        int[][] dp = new int[n][2];
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }
        int[] ans = dfs(0, -1, adj);
        return ans[1] == 0 ? ans[0] : 0;
    }
}
```

<!-- tabs:end -->

<!-- end -->
