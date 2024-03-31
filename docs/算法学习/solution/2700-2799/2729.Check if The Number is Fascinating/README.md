# [2729. 判断一个数是否迷人](https://leetcode.cn/problems/check-if-the-number-is-fascinating)

[English Version](/solution/2700-2799/2729.Check%20if%20The%20Number%20is%20Fascinating/README_EN.md)

<!-- tags:哈希表,数学 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>给你一个三位数整数 <code>n</code>&nbsp;。</p>

<p>如果经过以下修改得到的数字 <strong>恰好</strong>&nbsp;包含数字 <code>1</code>&nbsp;到 <code>9</code>&nbsp;各一次且不包含任何 <code>0</code>&nbsp;，那么我们称数字 <code>n</code>&nbsp;是 <strong>迷人的</strong>&nbsp;：</p>

<ul>
	<li>将&nbsp;<code>n</code>&nbsp;与数字&nbsp;<code>2 * n</code> 和&nbsp;<code>3 * n</code>&nbsp;<strong>连接</strong>&nbsp;。</li>
</ul>

<p>如果 <code>n</code>&nbsp;是迷人的，返回&nbsp;<code>true</code>，否则返回&nbsp;<code>false</code>&nbsp;。</p>

<p><strong>连接</strong>&nbsp;两个数字表示把它们首尾相接连在一起。比方说&nbsp;<code>121</code> 和&nbsp;<code>371</code>&nbsp;连接得到&nbsp;<code>121371</code>&nbsp;。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>n = 192
<b>输出：</b>true
<b>解释：</b>我们将数字 n = 192 ，2 * n = 384 和 3 * n = 576 连接，得到 192384576 。这个数字包含 1 到 9 恰好各一次。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>n = 100
<b>输出：</b>false
<b>解释：</b>我们将数字 n = 100 ，2 * n = 200 和 3 * n = 300 连接，得到 100200300 。这个数字不符合上述条件。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>100 &lt;= n &lt;= 999</code></li>
</ul>

## 解法

### 方法一：模拟

我们根据题目描述，将数字 $n$ 与 $2 \times n$ 和 $3 \times n$ 连接，得到字符串 $s$，然后判断 $s$ 是否包含数字 $1$ 到 $9$ 各一次且不包含任何 $0$ 即可。

时间复杂度 $O(\log n)$，空间复杂度 $O(\log n)$。其中 $n$ 为题目给定的整数。

<!-- tabs:start -->

```python
class Solution:
    def isFascinating(self, n: int) -> bool:
        s = str(n) + str(2 * n) + str(3 * n)
        return "".join(sorted(s)) == "123456789"
```

```java
class Solution {
    public boolean isFascinating(int n) {
        String s = "" + n + (2 * n) + (3 * n);
        int[] cnt = new int[10];
        for (char c : s.toCharArray()) {
            if (++cnt[c - '0'] > 1) {
                return false;
            }
        }
        return cnt[0] == 0 && s.length() == 9;
    }
}
```

```cpp
class Solution {
public:
    bool isFascinating(int n) {
        string s = to_string(n) + to_string(n * 2) + to_string(n * 3);
        sort(s.begin(), s.end());
        return s == "123456789";
    }
};
```

```go
func isFascinating(n int) bool {
	s := strconv.Itoa(n) + strconv.Itoa(n*2) + strconv.Itoa(n*3)
	cnt := [10]int{}
	for _, c := range s {
		cnt[c-'0']++
		if cnt[c-'0'] > 1 {
			return false
		}
	}
	return cnt[0] == 0 && len(s) == 9
}
```

```ts
function isFascinating(n: number): boolean {
    const s = `${n}${n * 2}${n * 3}`;
    return s.split('').sort().join('') === '123456789';
}
```

```rust
impl Solution {
    pub fn is_fascinating(n: i32) -> bool {
        let s = format!("{}{}{}", n, n * 2, n * 3);

        let mut cnt = vec![0; 10];
        for c in s.chars() {
            let t = (c as usize) - ('0' as usize);
            cnt[t] += 1;
            if cnt[t] > 1 {
                return false;
            }
        }

        cnt[0] == 0 && s.len() == 9
    }
}
```

<!-- tabs:end -->

### 方法二

<!-- tabs:start -->

```rust
use std::collections::HashMap;

impl Solution {
    pub fn is_fascinating(mut n: i32) -> bool {
        let mut i = n * 2;
        let mut j = n * 3;

        let mut hash = HashMap::new();

        while n != 0 {
            let cnt = hash.entry(n % 10).or_insert(0);
            *cnt += 1;
            n /= 10;
        }

        while i != 0 {
            let cnt = hash.entry(i % 10).or_insert(0);
            *cnt += 1;
            i /= 10;
        }

        while j != 0 {
            let cnt = hash.entry(j % 10).or_insert(0);
            *cnt += 1;
            j /= 10;
        }

        for k in 1..=9 {
            if !hash.contains_key(&k) || hash[&k] > 1 {
                return false;
            }
        }

        !hash.contains_key(&0)
    }
}
```

<!-- tabs:end -->

<!-- end -->
