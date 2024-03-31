# [面试题 16.05. 阶乘尾数](https://leetcode.cn/problems/factorial-zeros-lcci)

## 题目描述

<!-- 这里写题目描述 -->

<p>设计一个算法，算出 n 阶乘有多少个尾随零。</p>
<p><strong>示例 1:</strong></p>
<pre class="AnLi"><strong>输入:</strong> 3
<strong>输出:</strong> 0
<strong>解释:</strong>&nbsp;3! = 6, 尾数中没有零。</pre>
<p><strong>示例&nbsp;2:</strong></p>
<pre class="AnLi"><strong>输入:</strong> 5
<strong>输出:</strong> 1
<strong>解释:</strong>&nbsp;5! = 120, 尾数中有 1 个零.</pre>
<p><strong>说明: </strong>你算法的时间复杂度应为&nbsp;<em>O</em>(log&nbsp;<em>n</em>)<em>&nbsp;</em>。</p>

## 解法

### 方法一：数学

题目实际上是求 $[1,n]$ 中有多少个 $5$ 的因数。

我们以 $130$ 为例来分析：

1. 第 $1$ 次除以 $5$，得到 $26$，表示存在 $26$ 个包含因数 $5$ 的数；
1. 第 $2$ 次除以 $5$，得到 $5$，表示存在 $5$ 个包含因数 $5^2$ 的数；
1. 第 $3$ 次除以 $5$，得到 $1$，表示存在 $1$ 个包含因数 $5^3$ 的数；
1. 累加得到从 $[1,n]$ 中所有 $5$ 的因数的个数。

时间复杂度 $O(\log n)$，空间复杂度 $O(1)$。

<!-- tabs:start -->

```python
class Solution:
    def trailingZeroes(self, n: int) -> int:
        ans = 0
        while n:
            n //= 5
            ans += n
        return ans
```

```java
class Solution {
    public int trailingZeroes(int n) {
        int ans = 0;
        while (n > 0) {
            n /= 5;
            ans += n;
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int trailingZeroes(int n) {
        int ans = 0;
        while (n) {
            n /= 5;
            ans += n;
        }
        return ans;
    }
};
```

```go
func trailingZeroes(n int) int {
	ans := 0
	for n > 0 {
		n /= 5
		ans += n
	}
	return ans
}
```

```ts
function trailingZeroes(n: number): number {
    let ans = 0;
    while (n > 0) {
        n = Math.floor(n / 5);
        ans += n;
    }
    return ans;
}
```

<!-- tabs:end -->

<!-- end -->
