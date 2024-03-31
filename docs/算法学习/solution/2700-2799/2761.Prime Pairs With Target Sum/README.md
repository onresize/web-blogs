# [2761. 和等于目标值的质数对](https://leetcode.cn/problems/prime-pairs-with-target-sum)

[English Version](/solution/2700-2799/2761.Prime%20Pairs%20With%20Target%20Sum/README_EN.md)

<!-- tags:数组,数学,枚举,数论 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一个整数 <code>n</code> 。如果两个整数 <code>x</code> 和 <code>y</code> 满足下述条件，则认为二者形成一个质数对：</p>

<ul>
	<li><code>1 &lt;= x &lt;= y &lt;= n</code></li>
	<li><code>x + y == n</code></li>
	<li><code>x</code> 和 <code>y</code> 都是质数</li>
</ul>

<p>请你以二维有序列表的形式返回符合题目要求的所有 <code>[x<sub>i</sub>, y<sub>i</sub>]</code> ，列表需要按 <code>x<sub>i</sub></code> 的 <strong>非递减顺序</strong> 排序。如果不存在符合要求的质数对，则返回一个空数组。</p>

<p><strong>注意：</strong>质数是大于 <code>1</code> 的自然数，并且只有两个因子，即它本身和 <code>1</code> 。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 10
<strong>输出：</strong>[[3,7],[5,5]]
<strong>解释：</strong>在这个例子中，存在满足条件的两个质数对。 
这两个质数对分别是 [3,7] 和 [5,5]，按照题面描述中的方式排序后返回。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 2
<strong>输出：</strong>[]
<strong>解释：</strong>可以证明不存在和为 2 的质数对，所以返回一个空数组。 
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>6</sup></code></li>
</ul>

## 解法

### 方法一：预处理 + 枚举

我们先预处理出 $n$ 范围内的所有质数，记录在数组 $primes$ 中，其中 $primes[i]$ 为 `true` 表示 $i$ 是一个质数。

接下来，我们在 $[2, \frac{n}{2}]$ 的范围内枚举 $x$，那么 $y = n - x$，如果 $primes[x]$ 和 $primes[y]$ 均为 `true`，那么 $(x, y)$ 是一个质数对，添加到答案中。

枚举结束后，返回答案即可。

时间复杂度 $O(n \log \log n)$，空间复杂度 $O(n)$。其中 $n$ 是题目给定的数字。

<!-- tabs:start -->

```python
class Solution:
    def findPrimePairs(self, n: int) -> List[List[int]]:
        primes = [True] * n
        for i in range(2, n):
            if primes[i]:
                for j in range(i + i, n, i):
                    primes[j] = False
        ans = []
        for x in range(2, n // 2 + 1):
            y = n - x
            if primes[x] and primes[y]:
                ans.append([x, y])
        return ans
```

```java
class Solution {
    public List<List<Integer>> findPrimePairs(int n) {
        boolean[] primes = new boolean[n];
        Arrays.fill(primes, true);
        for (int i = 2; i < n; ++i) {
            if (primes[i]) {
                for (int j = i + i; j < n; j += i) {
                    primes[j] = false;
                }
            }
        }
        List<List<Integer>> ans = new ArrayList<>();
        for (int x = 2; x <= n / 2; ++x) {
            int y = n - x;
            if (primes[x] && primes[y]) {
                ans.add(List.of(x, y));
            }
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findPrimePairs(int n) {
        bool primes[n];
        memset(primes, true, sizeof(primes));
        for (int i = 2; i < n; ++i) {
            if (primes[i]) {
                for (int j = i + i; j < n; j += i) {
                    primes[j] = false;
                }
            }
        }
        vector<vector<int>> ans;
        for (int x = 2; x <= n / 2; ++x) {
            int y = n - x;
            if (primes[x] && primes[y]) {
                ans.push_back({x, y});
            }
        }
        return ans;
    }
};
```

```go
func findPrimePairs(n int) (ans [][]int) {
	primes := make([]bool, n)
	for i := range primes {
		primes[i] = true
	}
	for i := 2; i < n; i++ {
		if primes[i] {
			for j := i + i; j < n; j += i {
				primes[j] = false
			}
		}
	}
	for x := 2; x <= n/2; x++ {
		y := n - x
		if primes[x] && primes[y] {
			ans = append(ans, []int{x, y})
		}
	}
	return
}
```

```ts
function findPrimePairs(n: number): number[][] {
    const primes: boolean[] = new Array(n).fill(true);
    for (let i = 2; i < n; ++i) {
        if (primes[i]) {
            for (let j = i + i; j < n; j += i) {
                primes[j] = false;
            }
        }
    }
    const ans: number[][] = [];
    for (let x = 2; x <= n / 2; ++x) {
        const y = n - x;
        if (primes[x] && primes[y]) {
            ans.push([x, y]);
        }
    }
    return ans;
}
```

<!-- tabs:end -->

<!-- end -->
