# [面试题 17.01. 不用加号的加法](https://leetcode.cn/problems/add-without-plus-lcci)

## 题目描述

<!-- 这里写题目描述 -->

<p>设计一个函数把两个数字相加。不得使用 + 或者其他算术运算符。</p>

<p><strong>示例:</strong></p>

<pre class="AnLi"><strong>输入:</strong> a = 1, b = 1
<strong>输出:</strong> 2</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>a</code>,&nbsp;<code>b</code>&nbsp;均可能是负数或 0</li>
	<li>结果不会溢出 32 位整数</li>
</ul>

## 解法

### 方法一

<!-- tabs:start -->

```java
class Solution {
    public int add(int a, int b) {
        int sum = 0, carry = 0;
        while (b != 0) {
            sum = a ^ b;
            carry = (a & b) << 1;
            a = sum;
            b = carry;
        }
        return a;
    }
}
```

<!-- tabs:end -->

<!-- end -->
