# [面试题 05.04. 下一个数](https://leetcode.cn/problems/closed-number-lcci)

## 题目描述

<!-- 这里写题目描述 -->

<p>下一个数。给定一个正整数，找出与其二进制表达式中1的个数相同且大小最接近的那两个数（一个略大，一个略小）。</p>
<p> <strong>示例1:</strong></p>
<pre class="AnLi">
<strong> 输入</strong>：num = 2（或者0b10）
<strong> 输出</strong>：[4, 1] 或者（[0b100, 0b1]）
</pre>
<p> <strong>示例2:</strong></p>
<pre class="AnLi">
<strong> 输入</strong>：num = 1
<strong> 输出</strong>：[2, -1]
</pre>
<p> <strong>提示:</strong></p>
<ol>
<li><code>num</code>的范围在[1, 2147483647]之间；</li>
<li>如果找不到前一个或者后一个满足条件的正数，那么输出 -1。</li>
</ol>

## 解法

### 方法一：位运算

我们先考虑如何找出第一个比 $num$ 大且二进制表示中 $1$ 的个数相同的数。

我们可以从低位到高位遍历 $num$ 的相邻两个二进制位，如果低位为 $1$，且相邻的较高一位为 $0$，那么我们就找到了一个位置，我们可以将这个位置的 $0$ 变成 $1$，将这个位置的 $1$ 变成 $0$。然后我们把其余低位的 $1$ 全部移动到最低位，这样我们就得到了一个比 $num$ 大且二进制表示中 $1$ 的个数相同的数。

同理，我们可以找到第一个比 $num$ 小且二进制表示中 $1$ 的个数相同的数。

我们可以从低位到高位遍历 $num$ 的相邻两个二进制位，如果低位为 $0$，且相邻的较高一位为 $1$，那么我们就找到了一个位置，我们可以将这个位置的 $1$ 变成 $0$，将这个位置的 $0$ 变成 $1$。然后我们把其余低位的 $0$ 全部移动到最低位，这样我们就得到了一个比 $num$ 小且二进制表示中 $1$ 的个数相同的数。

在实现上，我们可以用一段代码来统一处理以上两种情况。

时间复杂度 $O(\log n)$，其中 $n$ 是 $num$ 的大小。空间复杂度 $O(1)$。

<!-- tabs:start -->

```python
class Solution:
    def findClosedNumbers(self, num: int) -> List[int]:
        ans = [-1] * 2
        dirs = (0, 1, 0)
        for p in range(2):
            a, b = dirs[p], dirs[p + 1]
            x = num
            for i in range(1, 31):
                if (x >> i & 1) == a and (x >> (i - 1) & 1) == b:
                    x ^= 1 << i
                    x ^= 1 << (i - 1)
                    j, k = 0, i - 2
                    while j < k:
                        while j < k and (x >> j & 1) == b:
                            j += 1
                        while j < k and (x >> k & 1) == a:
                            k -= 1
                        if j < k:
                            x ^= 1 << j
                            x ^= 1 << k
                    ans[p] = x
                    break
        return ans
```

```java
class Solution {
    public int[] findClosedNumbers(int num) {
        int[] ans = {-1, -1};
        int[] dirs = {0, 1, 0};
        for (int p = 0; p < 2; ++p) {
            int a = dirs[p], b = dirs[p + 1];
            int x = num;
            for (int i = 1; i < 31; ++i) {
                if ((x >> i & 1) == a && (x >> (i - 1) & 1) == b) {
                    x ^= 1 << i;
                    x ^= 1 << (i - 1);
                    int j = 0, k = i - 2;
                    while (j < k) {
                        while (j < k && (x >> j & 1) == b) {
                            ++j;
                        }
                        while (j < k && (x >> k & 1) == a) {
                            --k;
                        }
                        if (j < k) {
                            x ^= 1 << j;
                            x ^= 1 << k;
                        }
                    }
                    ans[p] = x;
                    break;
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
    vector<int> findClosedNumbers(int num) {
        vector<int> ans(2, -1);
        int dirs[3] = {0, 1, 0};
        for (int p = 0; p < 2; ++p) {
            int a = dirs[p], b = dirs[p + 1];
            int x = num;
            for (int i = 1; i < 31; ++i) {
                if ((x >> i & 1) == a && (x >> (i - 1) & 1) == b) {
                    x ^= 1 << i;
                    x ^= 1 << (i - 1);
                    int j = 0, k = i - 2;
                    while (j < k) {
                        while (j < k && (x >> j & 1) == b) {
                            ++j;
                        }
                        while (j < k && (x >> k & 1) == a) {
                            --k;
                        }
                        if (j < k) {
                            x ^= 1 << j;
                            x ^= 1 << k;
                        }
                    }
                    ans[p] = x;
                    break;
                }
            }
        }
        return ans;
    }
};
```

```go
func findClosedNumbers(num int) []int {
	ans := []int{-1, -1}
	dirs := [3]int{0, 1, 0}
	for p := 0; p < 2; p++ {
		a, b := dirs[p], dirs[p+1]
		x := num
		for i := 1; i < 31; i++ {
			if x>>i&1 == a && x>>(i-1)&1 == b {
				x ^= 1 << i
				x ^= 1 << (i - 1)
				j, k := 0, i-2
				for j < k {
					for j < k && x>>j&1 == b {
						j++
					}
					for j < k && x>>k&1 == a {
						k--
					}
					if j < k {
						x ^= 1 << j
						x ^= 1 << k
					}
				}
				ans[p] = x
				break
			}
		}
	}
	return ans
}
```

```ts
function findClosedNumbers(num: number): number[] {
    const ans: number[] = [-1, -1];
    const dirs: number[] = [0, 1, 0];
    for (let p = 0; p < 2; ++p) {
        const [a, b] = [dirs[p], dirs[p + 1]];
        let x = num;
        for (let i = 1; i < 31; ++i) {
            if (((x >> i) & 1) === a && ((x >> (i - 1)) & 1) === b) {
                x ^= 1 << i;
                x ^= 1 << (i - 1);
                let [j, k] = [0, i - 2];
                while (j < k) {
                    while (j < k && ((x >> j) & 1) === b) {
                        ++j;
                    }
                    while (j < k && ((x >> k) & 1) === a) {
                        --k;
                    }
                    if (j < k) {
                        x ^= 1 << j;
                        x ^= 1 << k;
                    }
                }
                ans[p] = x;
                break;
            }
        }
    }
    return ans;
}
```

<!-- tabs:end -->

<!-- end -->
