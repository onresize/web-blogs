# [2836. 在传球游戏中最大化函数值](https://leetcode.cn/problems/maximize-value-of-function-in-a-ball-passing-game)

[English Version](/solution/2800-2899/2836.Maximize%20Value%20of%20Function%20in%20a%20Ball%20Passing%20Game/README_EN.md)

<!-- tags:位运算,数组,动态规划 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一个长度为 <code>n</code>&nbsp;下标从 <strong>0</strong>&nbsp;开始的整数数组&nbsp;<code>receiver</code>&nbsp;和一个整数&nbsp;<code>k</code>&nbsp;。</p>

<p>总共有&nbsp;<code>n</code>&nbsp;名玩家，玩家 <strong>编号</strong>&nbsp;互不相同，且为&nbsp;<code>[0, n - 1]</code>&nbsp;中的整数。这些玩家玩一个传球游戏，<code>receiver[i]</code>&nbsp;表示编号为 <code>i</code>&nbsp;的玩家会传球给编号为 <code>receiver[i]</code>&nbsp;的玩家。玩家可以传球给自己，也就是说&nbsp;<code>receiver[i]</code>&nbsp;可能等于&nbsp;<code>i</code>&nbsp;。</p>

<p>你需要从 <code>n</code>&nbsp;名玩家中选择一名玩家作为游戏开始时唯一手中有球的玩家，球会被传 <strong>恰好</strong>&nbsp;<code>k</code>&nbsp;次。</p>

<p>如果选择编号为 <code>x</code>&nbsp;的玩家作为开始玩家，定义函数&nbsp;<code>f(x)</code>&nbsp;表示从编号为&nbsp;<code>x</code>&nbsp;的玩家开始，<code>k</code>&nbsp;次传球内所有接触过球玩家的编号之&nbsp;<strong>和</strong>&nbsp;，如果有玩家多次触球，则 <strong>累加多次</strong>&nbsp;。换句话说，&nbsp;<code>f(x) = x + receiver[x] + receiver[receiver[x]] + ... + receiver<sup>(k)</sup>[x]</code>&nbsp;。</p>

<p>你的任务时选择开始玩家 <code>x</code>&nbsp;，目的是<strong>&nbsp;最大化</strong>&nbsp;<code>f(x)</code>&nbsp;。</p>

<p>请你返回函数的 <strong>最大值</strong>&nbsp;。</p>

<p><strong>注意：</strong><code>receiver</code>&nbsp;可能含有重复元素。</p>

<p>&nbsp;</p>

<p><strong class="example">示例 1：</strong></p>

<table border="1" cellspacing="3" style="border-collapse: separate; text-align: center;">
	<tbody>
		<tr>
			<th style="padding: 5px; border: 1px solid black;">传递次数</th>
			<th style="padding: 5px; border: 1px solid black;">传球者编号</th>
			<th style="padding: 5px; border: 1px solid black;">接球者编号</th>
			<th style="padding: 5px; border: 1px solid black;">x + 所有接球者编号</th>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">&nbsp;</td>
			<td style="padding: 5px; border: 1px solid black;">&nbsp;</td>
			<td style="padding: 5px; border: 1px solid black;">&nbsp;</td>
			<td style="padding: 5px; border: 1px solid black;">2</td>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">1</td>
			<td style="padding: 5px; border: 1px solid black;">2</td>
			<td style="padding: 5px; border: 1px solid black;">1</td>
			<td style="padding: 5px; border: 1px solid black;">3</td>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">2</td>
			<td style="padding: 5px; border: 1px solid black;">1</td>
			<td style="padding: 5px; border: 1px solid black;">0</td>
			<td style="padding: 5px; border: 1px solid black;">3</td>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">3</td>
			<td style="padding: 5px; border: 1px solid black;">0</td>
			<td style="padding: 5px; border: 1px solid black;">2</td>
			<td style="padding: 5px; border: 1px solid black;">5</td>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">4</td>
			<td style="padding: 5px; border: 1px solid black;">2</td>
			<td style="padding: 5px; border: 1px solid black;">1</td>
			<td style="padding: 5px; border: 1px solid black;">6</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<pre>
<b>输入：</b>receiver = [2,0,1], k = 4
<b>输出：</b>6
<b>解释：</b>上表展示了从编号为 x = 2 开始的游戏过程。
从表中可知，f(2) 等于 6 。
6 是能得到最大的函数值。
所以输出为 6 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<table border="1" cellspacing="3" style="border-collapse: separate; text-align: center;">
	<tbody>
		<tr>
			<th style="padding: 5px; border: 1px solid black;">传递次数</th>
			<th style="padding: 5px; border: 1px solid black;">传球者编号</th>
			<th style="padding: 5px; border: 1px solid black;">接球者编号</th>
			<th style="padding: 5px; border: 1px solid black;">x + 所有接球者编号</th>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">&nbsp;</td>
			<td style="padding: 5px; border: 1px solid black;">&nbsp;</td>
			<td style="padding: 5px; border: 1px solid black;">&nbsp;</td>
			<td style="padding: 5px; border: 1px solid black;">4</td>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">1</td>
			<td style="padding: 5px; border: 1px solid black;">4</td>
			<td style="padding: 5px; border: 1px solid black;">3</td>
			<td style="padding: 5px; border: 1px solid black;">7</td>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">2</td>
			<td style="padding: 5px; border: 1px solid black;">3</td>
			<td style="padding: 5px; border: 1px solid black;">2</td>
			<td style="padding: 5px; border: 1px solid black;">9</td>
		</tr>
		<tr>
			<td style="padding: 5px; border: 1px solid black;">3</td>
			<td style="padding: 5px; border: 1px solid black;">2</td>
			<td style="padding: 5px; border: 1px solid black;">1</td>
			<td style="padding: 5px; border: 1px solid black;">10</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

<pre>
<b>输入：</b>receiver = [1,1,1,2,3], k = 3
<b>输出：</b>10
<b>解释：</b>上表展示了从编号为 x = 4 开始的游戏过程。
从表中可知，f(4) 等于 10 。
10 是能得到最大的函数值。
所以输出为 10 。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= receiver.length == n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= receiver[i] &lt;= n - 1</code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>10</sup></code></li>
</ul>

## 解法

### 方法一：动态规划 + 倍增

题目要我们寻找从每个玩家 $i$ 开始，传球 $k$ 次内所有接触过球玩家的编号之和的最大值。如果暴力求解，需要从 $i$ 开始向上遍历 $k$ 次，时间复杂度为 $O(k)$，显然会超时。

我们可以使用动态规划，结合倍增的思想来处理。

我们定义 $f[i][j]$ 表示从玩家 $i$ 开始，传球 $2^j$ 次所能到达的玩家编号，定义 $g[i][j]$ 表示从玩家 $i$ 开始，传球 $2^j$ 次所能到达的玩家编号之和（不包括最后一个玩家）。

当 $j=0$ 是，传球次数为 $1$，所以 $f[i][0] = receiver[i]$，而 $g[i][0] = i$。

当 $j \gt 0$ 时，传球次数为 $2^j$，相当于从玩家 $i$ 开始，传球 $2^{j-1}$ 次，再从玩家 $f[i][j-1]$ 开始，传球 $2^{j-1}$ 次，所以 $f[i][j] = f[f[i][j-1]][j-1]$，而 $g[i][j] = g[i][j-1] + g[f[i][j-1]][j-1]$。

接下来，我们可以枚举每个玩家 $i$ 作为开始玩家，然后根据 $k$ 的二进制表示，累计向上查询，最终得到玩家 $i$ 开始，传球 $k$ 次内所有接触过球玩家的编号之和的最大值。

时间复杂度 $O(n \times \log k)$，空间复杂度 $O(n \times \log k)$。其中 $n$ 为玩家数。

相似题目：

-   [1483. 树节点的第 K 个祖先](https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1483.Kth%20Ancestor%20of%20a%20Tree%20Node/README.md)

<!-- tabs:start -->

```python
class Solution:
    def getMaxFunctionValue(self, receiver: List[int], k: int) -> int:
        n, m = len(receiver), k.bit_length()
        f = [[0] * m for _ in range(n)]
        g = [[0] * m for _ in range(n)]
        for i, x in enumerate(receiver):
            f[i][0] = x
            g[i][0] = i
        for j in range(1, m):
            for i in range(n):
                f[i][j] = f[f[i][j - 1]][j - 1]
                g[i][j] = g[i][j - 1] + g[f[i][j - 1]][j - 1]
        ans = 0
        for i in range(n):
            p, t = i, 0
            for j in range(m):
                if k >> j & 1:
                    t += g[p][j]
                    p = f[p][j]
            ans = max(ans, t + p)
        return ans
```

```java
class Solution {
    public long getMaxFunctionValue(List<Integer> receiver, long k) {
        int n = receiver.size(), m = 64 - Long.numberOfLeadingZeros(k);
        int[][] f = new int[n][m];
        long[][] g = new long[n][m];
        for (int i = 0; i < n; ++i) {
            f[i][0] = receiver.get(i);
            g[i][0] = i;
        }
        for (int j = 1; j < m; ++j) {
            for (int i = 0; i < n; ++i) {
                f[i][j] = f[f[i][j - 1]][j - 1];
                g[i][j] = g[i][j - 1] + g[f[i][j - 1]][j - 1];
            }
        }
        long ans = 0;
        for (int i = 0; i < n; ++i) {
            int p = i;
            long t = 0;
            for (int j = 0; j < m; ++j) {
                if ((k >> j & 1) == 1) {
                    t += g[p][j];
                    p = f[p][j];
                }
            }
            ans = Math.max(ans, p + t);
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    long long getMaxFunctionValue(vector<int>& receiver, long long k) {
        int n = receiver.size(), m = 64 - __builtin_clzll(k);
        int f[n][m];
        long long g[n][m];
        for (int i = 0; i < n; ++i) {
            f[i][0] = receiver[i];
            g[i][0] = i;
        }
        for (int j = 1; j < m; ++j) {
            for (int i = 0; i < n; ++i) {
                f[i][j] = f[f[i][j - 1]][j - 1];
                g[i][j] = g[i][j - 1] + g[f[i][j - 1]][j - 1];
            }
        }
        long long ans = 0;
        for (int i = 0; i < n; ++i) {
            int p = i;
            long long t = 0;
            for (int j = 0; j < m; ++j) {
                if (k >> j & 1) {
                    t += g[p][j];
                    p = f[p][j];
                }
            }
            ans = max(ans, p + t);
        }
        return ans;
    }
};
```

```go
func getMaxFunctionValue(receiver []int, k int64) (ans int64) {
	n, m := len(receiver), bits.Len(uint(k))
	f := make([][]int, n)
	g := make([][]int64, n)
	for i := range f {
		f[i] = make([]int, m)
		g[i] = make([]int64, m)
		f[i][0] = receiver[i]
		g[i][0] = int64(i)
	}
	for j := 1; j < m; j++ {
		for i := 0; i < n; i++ {
			f[i][j] = f[f[i][j-1]][j-1]
			g[i][j] = g[i][j-1] + g[f[i][j-1]][j-1]
		}
	}
	for i := 0; i < n; i++ {
		p := i
		t := int64(0)
		for j := 0; j < m; j++ {
			if k>>j&1 == 1 {
				t += g[p][j]
				p = f[p][j]
			}
		}
		ans = max(ans, t+int64(p))
	}
	return
}
```

<!-- tabs:end -->

<!-- end -->
