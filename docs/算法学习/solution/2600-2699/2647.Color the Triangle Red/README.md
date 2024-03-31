# [2647. 把三角形染成红色](https://leetcode.cn/problems/color-the-triangle-red)

[English Version](/solution/2600-2699/2647.Color%20the%20Triangle%20Red/README_EN.md)

<!-- tags:数组,数学 -->

## 题目描述

<!-- 这里写题目描述 -->

<p>现给定你一个整数 <code>n</code> 。考虑一个边长为 <code>n</code> 的等边三角形，被分成 <code>n<sup>2</sup></code> 个单位等边三角形。这个三角形有 <code>n</code> 个 <strong>从 1 开始编号</strong> 的行，其中第 <code>i</code> 行有 <code>2i - 1</code> 个单位等边三角形。</p>

<p>第 <code>i</code> 行的三角形也是&nbsp;<strong>从 1 开始编号&nbsp;</strong>的，其坐标从 <code>(i, 1)</code> 到 <code>(i, 2i - 1)</code>&nbsp;。下面的图像显示了一个边长为 <code>4</code> 的三角形及其三角形的索引。</p>
<img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2600-2699/2647.Color%20the%20Triangle%20Red/images/triangle4.jpg" style="width: 402px; height: 242px;" />
<p>如果两个三角形 <strong>共享一条边</strong> ，则它们是 <strong>相邻</strong> 的。例如：</p>

<ul>
	<li>三角形 <code>(1,1)</code> 和 <code>(2,2)</code> 是相邻的。</li>
	<li>三角形 <code>(3,2)</code> 和 <code>(3,3)</code> 是相邻的。</li>
	<li>三角形 <code>(2,2)</code> 和 <code>(3,3)</code> 不相邻，因为它们没有共享任何边。</li>
</ul>

<p>初始时，所有单位三角形都是 <strong>白色</strong> 的。你想选择 <code>k</code> 个三角形并将它们涂成 <strong>红色</strong> 。然后我们将运行以下算法：</p>

<ol>
	<li>选择一个 <strong>至少有两个</strong> 红色相邻三角形的白色三角形。
    <ul>
    	<li>如果没有这样的三角形，请停止算法。</li>
    </ul>
    </li>
    <li>将该三角形涂成 <strong>红色</strong> 。</li>
    <li>回到步骤 1。</li>
</ol>

<p>选择最小的 <code>k</code> 并在运行此算法之前将 <code>k</code> 个三角形涂成红色，使得在算法停止后，所有单元三角形都被涂成红色。</p>

<p>返回一个二维列表，其中包含你要最初涂成红色的三角形的坐标。答案必须尽可能小。如果有多个有效的解决方案，请返回其中任意一个。</p>

<p>&nbsp;</p>

<p><strong class="example">示例 1 ：</strong></p>
<img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2600-2699/2647.Color%20the%20Triangle%20Red/images/example1.jpg" style="width: 500px; height: 263px;" />
<pre>
<b>输入：</b>n = 3
<b>输出：</b>[[1,1],[2,1],[2,3],[3,1],[3,5]]
<b>解释：</b>初始时，我们选择展示的5个三角形染成红色。然后，我们运行以下算法：
- 选择(2,2)，它有三个红色相邻的三角形，并将其染成红色。
- 选择(3,2)，它有两个红色相邻的三角形，并将其染成红色。
- 选择(3,4)，它有三个红色相邻的三角形，并将其染成红色。
- 选择(3,3)，它有三个红色相邻的三角形，并将其染成红色。 
可以证明，选择任何4个三角形并运行算法都无法将所有三角形都染成红色。</pre>

<p><strong class="example">示例 2 ：</strong></p>
<img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2600-2699/2647.Color%20the%20Triangle%20Red/images/example2.jpg" style="width: 300px; height: 101px;" />
<pre>
<b>输入：</b>n = 2
<b>输出：</b>[[1,1],[2,1],[2,3]]
<b>解释：</b>初始时，我们选择图中所示的 3 个三角形为红色。然后，我们运行以下算法： 
-选择有三个红色相邻的 (2,2) 三角形并将其染成红色。 
可以证明，选择任意 2 个三角形并运行该算法都不能使所有三角形变为红色。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 1000</code></li>
</ul>

## 解法

### 方法一：找规律

我们画图观察，可以发现，第一行只有一个三角形，一定要涂色，而从最后一行开始，到第二行结束，每四行的涂色方案是一样的：

1. 最后一行涂色坐标为 $(n, 1)$, $(n, 3)$, ..., $(n, 2n - 1)$。
1. 第 $n - 1$ 行涂色坐标为 $(n - 1, 2)$。
1. 第 $n - 2$ 行涂色坐标为 $(n - 2, 3)$, $(n - 2, 5)$, ..., $(n - 2, 2n - 5)$。
1. 第 $n - 3$ 行涂色坐标为 $(n - 3, 1)$。

<img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2600-2699/2647.Color%20the%20Triangle%20Red/images/demo3.png" style="width: 50%">

因此，我们可以按照上述规律，先给第一行涂色，然后从最后一行开始，每四行涂色一次，直到第二行结束。

<img alt="" src="https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/2600-2699/2647.Color%20the%20Triangle%20Red/images/demo2.png" style="width: 80%">

时间复杂度 $(n^2)$，其中 $n$ 为题目给定的参数。忽略答案数组的空间消耗，空间复杂度 $O(1)$。

<!-- tabs:start -->

```python
class Solution:
    def colorRed(self, n: int) -> List[List[int]]:
        ans = [[1, 1]]
        k = 0
        for i in range(n, 1, -1):
            if k == 0:
                for j in range(1, i << 1, 2):
                    ans.append([i, j])
            elif k == 1:
                ans.append([i, 2])
            elif k == 2:
                for j in range(3, i << 1, 2):
                    ans.append([i, j])
            else:
                ans.append([i, 1])
            k = (k + 1) % 4
        return ans
```

```java
class Solution {
    public int[][] colorRed(int n) {
        List<int[]> ans = new ArrayList<>();
        ans.add(new int[] {1, 1});
        for (int i = n, k = 0; i > 1; --i, k = (k + 1) % 4) {
            if (k == 0) {
                for (int j = 1; j < i << 1; j += 2) {
                    ans.add(new int[] {i, j});
                }
            } else if (k == 1) {
                ans.add(new int[] {i, 2});
            } else if (k == 2) {
                for (int j = 3; j < i << 1; j += 2) {
                    ans.add(new int[] {i, j});
                }
            } else {
                ans.add(new int[] {i, 1});
            }
        }
        return ans.toArray(new int[0][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> colorRed(int n) {
        vector<vector<int>> ans;
        ans.push_back({1, 1});
        for (int i = n, k = 0; i > 1; --i, k = (k + 1) % 4) {
            if (k == 0) {
                for (int j = 1; j < i << 1; j += 2) {
                    ans.push_back({i, j});
                }
            } else if (k == 1) {
                ans.push_back({i, 2});
            } else if (k == 2) {
                for (int j = 3; j < i << 1; j += 2) {
                    ans.push_back({i, j});
                }
            } else {
                ans.push_back({i, 1});
            }
        }
        return ans;
    }
};
```

```go
func colorRed(n int) (ans [][]int) {
	ans = append(ans, []int{1, 1})
	for i, k := n, 0; i > 1; i, k = i-1, (k+1)%4 {
		if k == 0 {
			for j := 1; j < i<<1; j += 2 {
				ans = append(ans, []int{i, j})
			}
		} else if k == 1 {
			ans = append(ans, []int{i, 2})
		} else if k == 2 {
			for j := 3; j < i<<1; j += 2 {
				ans = append(ans, []int{i, j})
			}
		} else {
			ans = append(ans, []int{i, 1})
		}
	}
	return
}
```

```ts
function colorRed(n: number): number[][] {
    const ans: number[][] = [[1, 1]];
    for (let i = n, k = 0; i > 1; --i, k = (k + 1) % 4) {
        if (k === 0) {
            for (let j = 1; j < i << 1; j += 2) {
                ans.push([i, j]);
            }
        } else if (k === 1) {
            ans.push([i, 2]);
        } else if (k === 2) {
            for (let j = 3; j < i << 1; j += 2) {
                ans.push([i, j]);
            }
        } else {
            ans.push([i, 1]);
        }
    }
    return ans;
}
```

<!-- tabs:end -->

<!-- end -->
