# [2718. 查询后矩阵的和](https://leetcode.cn/problems/sum-of-matrix-after-queries)

[English Version](/solution/2700-2799/2718.Sum%20of%20Matrix%20After%20Queries/README_EN.md)

<!-- tags:数组,哈希表 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一个整数&nbsp;<code>n</code>&nbsp;和一个下标从 <strong>0</strong>&nbsp;开始的 <strong>二维数组</strong>&nbsp;<code>queries</code>&nbsp;，其中&nbsp;<code>queries[i] = [type<sub>i</sub>, index<sub>i</sub>, val<sub>i</sub>]</code>&nbsp;。</p>

<p>一开始，给你一个下标从 <strong>0</strong>&nbsp;开始的&nbsp;<code>n x n</code>&nbsp;矩阵，所有元素均为 <code>0</code>&nbsp;。每一个查询，你需要执行以下操作之一：</p>

<ul>
	<li>如果&nbsp;<code>type<sub>i</sub> == 0</code>&nbsp;，将第&nbsp;<code>index<sub>i</sub></code>&nbsp;行的元素全部修改为&nbsp;<code>val<sub>i</sub></code>&nbsp;，覆盖任何之前的值。</li>
	<li>如果&nbsp;<code>type<sub>i</sub> == 1</code>&nbsp;，将第&nbsp;<code>index<sub>i</sub></code>&nbsp;列的元素全部修改为 <code>val<sub>i</sub></code>&nbsp;，覆盖任何之前的值。</li>
</ul>

<p>请你执行完所有查询以后，返回矩阵中所有整数的和。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2700-2799/2718.Sum%20of%20Matrix%20After%20Queries/images/exm1.png" style="width: 681px; height: 161px;"></p>

<pre><b>输入：</b>n = 3, queries = [[0,0,1],[1,2,2],[0,2,3],[1,0,4]]
<b>输出：</b>23
<b>解释：</b>上图展示了每个查询以后矩阵的值。所有操作执行完以后，矩阵元素之和为 23 。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2700-2799/2718.Sum%20of%20Matrix%20After%20Queries/images/exm2.png" style="width: 681px; height: 331px;"></p>

<pre><b>输入：</b>n = 3, queries = [[0,0,4],[0,1,2],[1,0,1],[0,2,3],[1,2,1]]
<b>输出：</b>17
<b>解释：</b>上图展示了每一个查询操作之后的矩阵。所有操作执行完以后，矩阵元素之和为 17 。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= queries.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>queries[i].length == 3</code></li>
	<li><code>0 &lt;= type<sub>i</sub> &lt;= 1</code></li>
	<li><code>0 &lt;= index<sub>i</sub>&nbsp;&lt; n</code></li>
	<li><code>0 &lt;= val<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>

## 解法

### 方法一：哈希表

由于每一行、每一列的值取决于最后一次的修改，因此，我们不妨倒序遍历所有的查询，使用哈希表 $row$ 和 $col$ 记录有哪些行和列被修改过。

对于每一次查询 $(t, i, v)$：

-   如果 $t = 0$，那么我们判断第 $i$ 行是否被修改过，如果没有，那么我们将 $v \times (n - |col|)$ 累加到答案中，其中 $|col|$ 表示 $col$ 的大小，然后将 $i$ 加入 $row$ 中；
-   如果 $t = 1$，那么我们判断第 $i$ 列是否被修改过，如果没有，那么我们将 $v \times (n - |row|)$ 累加到答案中，其中 $|row|$ 表示 $row$ 的大小，然后将 $i$ 加入 $col$ 中。

最后返回答案。

时间复杂度 $O(m)$，空间复杂度 $O(n)$。其中 $m$ 表示查询的次数。

<!-- tabs:start -->

```python
class Solution:
    def matrixSumQueries(self, n: int, queries: List[List[int]]) -> int:
        row = set()
        col = set()
        ans = 0
        for t, i, v in queries[::-1]:
            if t == 0:
                if i not in row:
                    ans += v * (n - len(col))
                    row.add(i)
            else:
                if i not in col:
                    ans += v * (n - len(row))
                    col.add(i)
        return ans
```

```java
class Solution {
    public long matrixSumQueries(int n, int[][] queries) {
        Set<Integer> row = new HashSet<>();
        Set<Integer> col = new HashSet<>();
        int m = queries.length;
        long ans = 0;
        for (int k = m - 1; k >= 0; --k) {
            var q = queries[k];
            int t = q[0], i = q[1], v = q[2];
            if (t == 0) {
                if (row.add(i)) {
                    ans += 1L * (n - col.size()) * v;
                }
            } else {
                if (col.add(i)) {
                    ans += 1L * (n - row.size()) * v;
                }
            }
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    long long matrixSumQueries(int n, vector<vector<int>>& queries) {
        unordered_set<int> row, col;
        reverse(queries.begin(), queries.end());
        long long ans = 0;
        for (auto& q : queries) {
            int t = q[0], i = q[1], v = q[2];
            if (t == 0) {
                if (!row.count(i)) {
                    ans += 1LL * (n - col.size()) * v;
                    row.insert(i);
                }
            } else {
                if (!col.count(i)) {
                    ans += 1LL * (n - row.size()) * v;
                    col.insert(i);
                }
            }
        }
        return ans;
    }
};
```

```go
func matrixSumQueries(n int, queries [][]int) (ans int64) {
	row, col := map[int]bool{}, map[int]bool{}
	m := len(queries)
	for k := m - 1; k >= 0; k-- {
		t, i, v := queries[k][0], queries[k][1], queries[k][2]
		if t == 0 {
			if !row[i] {
				ans += int64(v * (n - len(col)))
				row[i] = true
			}
		} else {
			if !col[i] {
				ans += int64(v * (n - len(row)))
				col[i] = true
			}
		}
	}
	return
}
```

```ts
function matrixSumQueries(n: number, queries: number[][]): number {
    const row: Set<number> = new Set();
    const col: Set<number> = new Set();
    let ans = 0;
    queries.reverse();
    for (const [t, i, v] of queries) {
        if (t === 0) {
            if (!row.has(i)) {
                ans += v * (n - col.size);
                row.add(i);
            }
        } else {
            if (!col.has(i)) {
                ans += v * (n - row.size);
                col.add(i);
            }
        }
    }
    return ans;
}
```

<!-- tabs:end -->

<!-- end -->
