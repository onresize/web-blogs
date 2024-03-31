# [面试题 08.11. 硬币](https://leetcode.cn/problems/coin-lcci)

## 题目描述

<!-- 这里写题目描述 -->
<p>硬币。给定数量不限的硬币，币值为25分、10分、5分和1分，编写代码计算n分有几种表示法。(结果可能会很大，你需要将结果模上1000000007)</p>
<p> <strong>示例1:</strong></p>
<pre class="AnLi">
<strong> 输入</strong>: n = 5
<strong> 输出</strong>：2
<strong> 解释</strong>: 有两种方式可以凑成总金额:
5=5
5=1+1+1+1+1
</pre>
<p> <strong>示例2:</strong></p>
<pre class="AnLi">
<strong> 输入</strong>: n = 10
<strong> 输出</strong>：4
<strong> 解释</strong>: 有四种方式可以凑成总金额:
10=10
10=5+5
10=5+1+1+1+1+1
10=1+1+1+1+1+1+1+1+1+1
</pre>
<p> <strong>说明：</strong></p>
<p>注意:</p>
<p>你可以假设：</p>
<ul>
    <li>0 &lt;= n (总金额) &lt;= 1000000</li>
</ul>

## 解法

### 方法一：动态规划

我们定义 $f[i][j]$ 表示只使用前 $i$ 种硬币的情况下，凑成总金额为 $j$ 的方案数。初始时 $f[0][0]=1$，其余元素都为 $0$。答案为 $f[4][n]$。

考虑 $f[i][j]$，我们可以枚举使用的第 $i$ 种硬币的个数 $k$，其中 $0 \leq k \leq j / c_i$，那么 $f[i][j]$ 就等于所有 $f[i−1][j−k \times c_i]$ 之和。由于硬币的数量是无限的，因此 $k$ 可以从 $0$ 开始取。即状态转移方程如下：

$$
f[i][j] = f[i - 1][j] + f[i - 1][j - c_i] + \cdots + f[i - 1][j - k \times c_i]
$$

不妨令 $j = j - c_i$，那么上面的状态转移方程可以写成：

$$
f[i][j - c_i] = f[i - 1][j - c_i] + f[i - 1][j - 2 \times c_i] + \cdots + f[i - 1][j - k \times c_i]
$$

将二式代入一式，得到：

$$
f[i][j]=
\begin{cases}
f[i - 1][j] + f[i][j - c_i], & j \geq c_i \\
f[i - 1][j], & j < c_i
\end{cases}
$$

最后的答案即为 $f[4][n]$。

时间复杂度 $O(C \times n)$，空间复杂度 $O(C \times n)$，其中 $C$ 为硬币的种类数。

我们注意到，$f[i][j]$ 的计算只与 $f[i−1][..]$ 有关，因此我们可以去掉第一维，将空间复杂度优化到 $O(n)$。

<!-- tabs:start -->

```python
class Solution:
    def waysToChange(self, n: int) -> int:
        mod = 10**9 + 7
        coins = [25, 10, 5, 1]
        f = [[0] * (n + 1) for _ in range(5)]
        f[0][0] = 1
        for i, c in enumerate(coins, 1):
            for j in range(n + 1):
                f[i][j] = f[i - 1][j]
                if j >= c:
                    f[i][j] = (f[i][j] + f[i][j - c]) % mod
        return f[-1][n]
```

```java
class Solution {
    public int waysToChange(int n) {
        final int mod = (int) 1e9 + 7;
        int[] coins = {25, 10, 5, 1};
        int[][] f = new int[5][n + 1];
        f[0][0] = 1;
        for (int i = 1; i <= 4; ++i) {
            for (int j = 0; j <= n; ++j) {
                f[i][j] = f[i - 1][j];
                if (j >= coins[i - 1]) {
                    f[i][j] = (f[i][j] + f[i][j - coins[i - 1]]) % mod;
                }
            }
        }
        return f[4][n];
    }
}
```

```cpp
class Solution {
public:
    int waysToChange(int n) {
        const int mod = 1e9 + 7;
        vector<int> coins = {25, 10, 5, 1};
        int f[5][n + 1];
        memset(f, 0, sizeof(f));
        f[0][0] = 1;
        for (int i = 1; i <= 4; ++i) {
            for (int j = 0; j <= n; ++j) {
                f[i][j] = f[i - 1][j];
                if (j >= coins[i - 1]) {
                    f[i][j] = (f[i][j] + f[i][j - coins[i - 1]]) % mod;
                }
            }
        }
        return f[4][n];
    }
};
```

```go
func waysToChange(n int) int {
	const mod int = 1e9 + 7
	coins := []int{25, 10, 5, 1}
	f := make([][]int, 5)
	for i := range f {
		f[i] = make([]int, n+1)
	}
	f[0][0] = 1
	for i := 1; i <= 4; i++ {
		for j := 0; j <= n; j++ {
			f[i][j] = f[i-1][j]
			if j >= coins[i-1] {
				f[i][j] = (f[i][j] + f[i][j-coins[i-1]]) % mod
			}
		}
	}
	return f[4][n]
}
```

```ts
function waysToChange(n: number): number {
    const mod = 10 ** 9 + 7;
    const coins: number[] = [25, 10, 5, 1];
    const f: number[][] = Array(5)
        .fill(0)
        .map(() => Array(n + 1).fill(0));
    f[0][0] = 1;
    for (let i = 1; i <= 4; ++i) {
        for (let j = 0; j <= n; ++j) {
            f[i][j] = f[i - 1][j];
            if (j >= coins[i - 1]) {
                f[i][j] = (f[i][j] + f[i][j - coins[i - 1]]) % mod;
            }
        }
    }
    return f[4][n];
}
```

<!-- tabs:end -->

### 方法二

<!-- tabs:start -->

```python
class Solution:
    def waysToChange(self, n: int) -> int:
        mod = 10**9 + 7
        coins = [25, 10, 5, 1]
        f = [1] + [0] * n
        for c in coins:
            for j in range(c, n + 1):
                f[j] = (f[j] + f[j - c]) % mod
        return f[n]
```

```java
class Solution {
    public int waysToChange(int n) {
        final int mod = (int) 1e9 + 7;
        int[] coins = {25, 10, 5, 1};
        int[] f = new int[n + 1];
        f[0] = 1;
        for (int c : coins) {
            for (int j = c; j <= n; ++j) {
                f[j] = (f[j] + f[j - c]) % mod;
            }
        }
        return f[n];
    }
}
```

```cpp
class Solution {
public:
    int waysToChange(int n) {
        const int mod = 1e9 + 7;
        vector<int> coins = {25, 10, 5, 1};
        int f[n + 1];
        memset(f, 0, sizeof(f));
        f[0] = 1;
        for (int c : coins) {
            for (int j = c; j <= n; ++j) {
                f[j] = (f[j] + f[j - c]) % mod;
            }
        }
        return f[n];
    }
};
```

```go
func waysToChange(n int) int {
	const mod int = 1e9 + 7
	coins := []int{25, 10, 5, 1}
	f := make([]int, n+1)
	f[0] = 1
	for _, c := range coins {
		for j := c; j <= n; j++ {
			f[j] = (f[j] + f[j-c]) % mod
		}
	}
	return f[n]
}
```

```ts
function waysToChange(n: number): number {
    const mod = 10 ** 9 + 7;
    const coins: number[] = [25, 10, 5, 1];
    const f: number[] = new Array(n + 1).fill(0);
    f[0] = 1;
    for (const c of coins) {
        for (let i = c; i <= n; ++i) {
            f[i] = (f[i] + f[i - c]) % mod;
        }
    }
    return f[n];
}
```

<!-- tabs:end -->

<!-- end -->
