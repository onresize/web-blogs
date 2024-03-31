# [面试题 01.03. URL 化](https://leetcode.cn/problems/string-to-url-lcci)

[English Version](/lcci/01.03.String%20to%20URL/README_EN.md)

## 题目描述

<!-- 这里写题目描述 -->
<p>URL化。编写一种方法，将字符串中的空格全部替换为<code>%20</code>。假定该字符串尾部有足够的空间存放新增字符，并且知道字符串的&ldquo;真实&rdquo;长度。（注：用<code>Java</code>实现的话，请使用字符数组实现，以便直接在数组上操作。）</p>

<p><strong>示例1:</strong></p>

<pre><strong> 输入</strong>：&quot;Mr John Smith    &quot;, 13
<strong> 输出</strong>：&quot;Mr%20John%20Smith&quot;
</pre>

<p><strong>示例2:</strong></p>

<pre><strong> 输入</strong>：&quot;               &quot;, 5
<strong> 输出</strong>：&quot;%20%20%20%20%20&quot;
</pre>

<p><strong>提示：</strong></p>

<ol>
	<li>字符串长度在[0, 500000]范围内。</li>
</ol>

## 解法

### 方法一：使用 `replace()` 函数

直接利用 `replace` 将所有 ` ` 替换为 `%20`：

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串长度。

<!-- tabs:start -->

```python
class Solution:
    def replaceSpaces(self, S: str, length: int) -> str:
        return S[:length].replace(' ', '%20')
```

```ts
function replaceSpaces(S: string, length: number): string {
    return S.slice(0, length).replace(/\s/g, '%20');
}
```

```rust
impl Solution {
    pub fn replace_spaces(s: String, length: i32) -> String {
        s[..length as usize].replace(' ', "%20")
    }
}
```

```js
/**
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
var replaceSpaces = function (S, length) {
    return encodeURI(S.substring(0, length));
};
```

<!-- tabs:end -->

### 方法二：模拟

遍历字符串每个字符 $c$，遇到空格则将 `%20` 添加到结果中，否则添加 $c$。

时间复杂度 $O(n)$，空间复杂度 $O(n)$。其中 $n$ 为字符串长度。

<!-- tabs:start -->

```python
class Solution:
    def replaceSpaces(self, S: str, length: int) -> str:
        return ''.join(['%20' if c == ' ' else c for c in S[:length]])
```

```java
class Solution {
    public String replaceSpaces(String S, int length) {
        char[] cs = S.toCharArray();
        int j = cs.length;
        for (int i = length - 1; i >= 0; --i) {
            if (cs[i] == ' ') {
                cs[--j] = '0';
                cs[--j] = '2';
                cs[--j] = '%';
            } else {
                cs[--j] = cs[i];
            }
        }
        return new String(cs, j, cs.length - j);
    }
}
```

```go
func replaceSpaces(S string, length int) string {
	// return url.PathEscape(S[:length])
	j := len(S)
	b := []byte(S)
	for i := length - 1; i >= 0; i-- {
		if b[i] == ' ' {
			b[j-1] = '0'
			b[j-2] = '2'
			b[j-3] = '%'
			j -= 3
		} else {
			b[j-1] = b[i]
			j--
		}
	}
	return string(b[j:])
}
```

```rust
impl Solution {
    pub fn replace_spaces(s: String, length: i32) -> String {
        s.chars()
            .take(length as usize)
            .map(|c| {
                if c == ' ' { "%20".to_string() } else { c.to_string() }
            })
            .collect()
    }
}
```

<!-- tabs:end -->

<!-- end -->
