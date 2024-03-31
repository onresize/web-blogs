# [面试题 16.26. 计算器](https://leetcode.cn/problems/calculator-lcci)

## 题目描述

<!-- 这里写题目描述 -->

<p>给定一个包含正整数、加(+)、减(-)、乘(*)、除(/)的算数表达式(括号除外)，计算其结果。</p>
<p>表达式仅包含非负整数，<code>+</code>， <code>-</code> ，<code>*</code>，<code>/</code> 四种运算符和空格&nbsp;<code>&nbsp;</code>。 整数除法仅保留整数部分。</p>
<p><strong>示例&nbsp;1:</strong></p>
<pre class="AnLi"><strong>输入: </strong>&quot;3+2*2&quot;
<strong>输出:</strong> 7
</pre>
<p><strong>示例 2:</strong></p>
<pre class="AnLi"><strong>输入:</strong> &quot; 3/2 &quot;
<strong>输出:</strong> 1</pre>
<p><strong>示例 3:</strong></p>
<pre class="AnLi"><strong>输入:</strong> &quot; 3+5 / 2 &quot;
<strong>输出:</strong> 5
</pre>
<p><strong>说明：</strong></p>
<ul>
	<li>你可以假设所给定的表达式都是有效的。</li>
	<li>请<strong>不要</strong>使用内置的库函数 <code>eval</code>。</li>
</ul>

## 解法

### 方法一：栈

我们可以用一个栈来保存数字，每次遇到运算符时，就将数字压入栈中。对于加减法，由于其优先级最低，我们可以直接将数字压入栈中；对于乘除法，由于其优先级较高，我们需要将栈顶元素取出，与当前数字进行乘除运算，再将结果压入栈中。

最后，将栈中所有元素求和即为答案。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串长度。

<!-- tabs:start -->

```python
class Solution:
    def calculate(self, s: str) -> int:
        n = len(s)
        x = 0
        sign = "+"
        stk = []
        for i, c in enumerate(s):
            if c.isdigit():
                x = x * 10 + ord(c) - ord("0")
            if i == n - 1 or c in "+-*/":
                match sign:
                    case "+":
                        stk.append(x)
                    case "-":
                        stk.append(-x)
                    case "*":
                        stk.append(stk.pop() * x)
                    case "/":
                        stk.append(int(stk.pop() / x))
                x = 0
                sign = c
        return sum(stk)
```

```java
class Solution {
    public int calculate(String s) {
        int n = s.length();
        int x = 0;
        char sign = '+';
        Deque<Integer> stk = new ArrayDeque<>();
        for (int i = 0; i < n; ++i) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                x = x * 10 + (c - '0');
            }
            if (i == n - 1 || !Character.isDigit(c) && c != ' ') {
                switch (sign) {
                    case '+' -> stk.push(x);
                    case '-' -> stk.push(-x);
                    case '*' -> stk.push(stk.pop() * x);
                    case '/' -> stk.push(stk.pop() / x);
                }
                x = 0;
                sign = c;
            }
        }
        int ans = 0;
        while (!stk.isEmpty()) {
            ans += stk.pop();
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int calculate(string s) {
        int n = s.size();
        int x = 0;
        char sign = '+';
        stack<int> stk;
        for (int i = 0; i < n; ++i) {
            char c = s[i];
            if (isdigit(c)) {
                x = x * 10 + (c - '0');
            }
            if (i == n - 1 || !isdigit(c) && c != ' ') {
                if (sign == '+') {
                    stk.push(x);
                } else if (sign == '-') {
                    stk.push(-x);
                } else if (sign == '*') {
                    int y = stk.top();
                    stk.pop();
                    stk.push(y * x);
                } else if (sign == '/') {
                    int y = stk.top();
                    stk.pop();
                    stk.push(y / x);
                }
                x = 0;
                sign = c;
            }
        }
        int ans = 0;
        while (!stk.empty()) {
            ans += stk.top();
            stk.pop();
        }
        return ans;
    }
};
```

```go
func calculate(s string) (ans int) {
	n := len(s)
	x := 0
	sign := '+'
	stk := []int{}
	for i := range s {
		if s[i] >= '0' && s[i] <= '9' {
			x = x*10 + int(s[i]-'0')
		}
		if i == n-1 || (s[i] != ' ' && (s[i] < '0' || s[i] > '9')) {
			switch sign {
			case '+':
				stk = append(stk, x)
			case '-':
				stk = append(stk, -x)
			case '*':
				stk[len(stk)-1] *= x
			case '/':
				stk[len(stk)-1] /= x
			}
			x = 0
			sign = rune(s[i])
		}
	}
	for _, x := range stk {
		ans += x
	}
	return
}
```

```ts
function calculate(s: string): number {
    const n = s.length;
    let x = 0;
    let sign = '+';
    const stk: number[] = [];
    for (let i = 0; i < n; ++i) {
        if (!isNaN(Number(s[i])) && s[i] !== ' ') {
            x = x * 10 + s[i].charCodeAt(0) - '0'.charCodeAt(0);
        }
        if (i === n - 1 || (isNaN(Number(s[i])) && s[i] !== ' ')) {
            switch (sign) {
                case '+':
                    stk.push(x);
                    break;
                case '-':
                    stk.push(-x);
                    break;
                case '*':
                    stk.push(stk.pop()! * x);
                    break;
                default:
                    stk.push((stk.pop()! / x) | 0);
            }
            x = 0;
            sign = s[i];
        }
    }
    return stk.reduce((x, y) => x + y);
}
```

<!-- tabs:end -->

<!-- end -->
