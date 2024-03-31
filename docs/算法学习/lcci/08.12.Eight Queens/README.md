# [面试题 08.12. 八皇后](https://leetcode.cn/problems/eight-queens-lcci)

## 题目描述

<!-- 这里写题目描述 -->
<p>设计一种算法，打印 N 皇后在 N &times; N 棋盘上的各种摆法，其中每个皇后都不同行、不同列，也不在对角线上。这里的&ldquo;对角线&rdquo;指的是所有的对角线，不只是平分整个棋盘的那两条对角线。</p>

<p><strong>注意：</strong>本题相对原题做了扩展</p>

<p><strong>示例:</strong></p>

<pre class="AnLi"><strong> 输入</strong>：4
<strong> 输出</strong>：[[&quot;.Q..&quot;,&quot;...Q&quot;,&quot;Q...&quot;,&quot;..Q.&quot;],[&quot;..Q.&quot;,&quot;Q...&quot;,&quot;...Q&quot;,&quot;.Q..&quot;]]
<strong> 解释</strong>: 4 皇后问题存在如下两个不同的解法。
[
&nbsp;[&quot;.Q..&quot;, &nbsp;// 解法 1
&nbsp; &quot;...Q&quot;,
&nbsp; &quot;Q...&quot;,
&nbsp; &quot;..Q.&quot;],

&nbsp;[&quot;..Q.&quot;, &nbsp;// 解法 2
&nbsp; &quot;Q...&quot;,
&nbsp; &quot;...Q&quot;,
&nbsp; &quot;.Q..&quot;]
]
</pre>

## 解法

### 方法一

<!-- tabs:start -->

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        g = [['.'] * n for _ in range(n)]
        col = [False] * n
        dg = [False] * (2 * n)
        udg = [False] * (2 * n)

        def dfs(u):
            if u == n:
                res.append([''.join(item) for item in g])
                return
            for i in range(n):
                if not col[i] and not dg[u + i] and not udg[n - u + i]:
                    g[u][i] = 'Q'
                    col[i] = dg[u + i] = udg[n - u + i] = True
                    dfs(u + 1)
                    g[u][i] = '.'
                    col[i] = dg[u + i] = udg[n - u + i] = False

        dfs(0)
        return res
```

```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        String[][] g = new String[n][n];
        for (int i = 0; i < n; ++i) {
            String[] t = new String[n];
            Arrays.fill(t, ".");
            g[i] = t;
        }
        // 列是否已经有值
        boolean[] col = new boolean[n];
        // 斜线是否已经有值
        boolean[] dg = new boolean[2 * n];
        // 反斜线是否已经有值
        boolean[] udg = new boolean[2 * n];
        // 从第一行开始搜索
        dfs(0, n, col, dg, udg, g, res);
        return res;
    }

    private void dfs(int u, int n, boolean[] col, boolean[] dg, boolean[] udg, String[][] g,
        List<List<String>> res) {
        if (u == n) {
            List<String> t = new ArrayList<>();
            for (String[] e : g) {
                t.add(String.join("", e));
            }
            res.add(t);
            return;
        }
        for (int i = 0; i < n; ++i) {
            if (!col[i] && !dg[u + i] && !udg[n - u + i]) {
                g[u][i] = "Q";
                col[i] = dg[u + i] = udg[n - u + i] = true;
                dfs(u + 1, n, col, dg, udg, g, res);
                g[u][i] = ".";
                col[i] = dg[u + i] = udg[n - u + i] = false;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> g(n, string(n, '.'));
        vector<bool> col(n, false);
        vector<bool> dg(2 * n, false);
        vector<bool> udg(2 * n, false);
        dfs(0, n, col, dg, udg, g, res);
        return res;
    }

    void dfs(int u, int n, vector<bool>& col, vector<bool>& dg, vector<bool>& udg, vector<string>& g, vector<vector<string>>& res) {
        if (u == n) {
            res.push_back(g);
            return;
        }
        for (int i = 0; i < n; ++i) {
            if (!col[i] && !dg[u + i] && !udg[n - u + i]) {
                g[u][i] = 'Q';
                col[i] = dg[u + i] = udg[n - u + i] = true;
                dfs(u + 1, n, col, dg, udg, g, res);
                g[u][i] = '.';
                col[i] = dg[u + i] = udg[n - u + i] = false;
            }
        }
    }
};
```

```go
func solveNQueens(n int) [][]string {
	res := [][]string{}
	g := make([][]string, n)
	for i := range g {
		g[i] = make([]string, n)
		for j := range g[i] {
			g[i][j] = "."
		}
	}
	col := make([]bool, n)
	dg := make([]bool, 2*n)
	udg := make([]bool, 2*n)
	dfs(0, n, col, dg, udg, g, &res)
	return res
}

func dfs(u, n int, col, dg, udg []bool, g [][]string, res *[][]string) {
	if u == n {
		t := make([]string, n)
		for i := 0; i < n; i++ {
			t[i] = strings.Join(g[i], "")
		}
		*res = append(*res, t)
		return
	}
	for i := 0; i < n; i++ {
		if !col[i] && !dg[u+i] && !udg[n-u+i] {
			g[u][i] = "Q"
			col[i], dg[u+i], udg[n-u+i] = true, true, true
			dfs(u+1, n, col, dg, udg, g, res)
			g[u][i] = "."
			col[i], dg[u+i], udg[n-u+i] = false, false, false
		}
	}
}
```

```cs
using System.Collections.Generic;
using System.Text;

public class Solution {
    private IList<IList<string>> results = new List<IList<string>>();
    private int n;

    public IList<IList<string>> SolveNQueens(int n) {
        this.n = n;
        Search(new List<int>(), 0, 0, 0);
        return results;
    }

    private void Search(IList<int> state, int left, int right, int vertical)
    {
        if (state.Count == n)
        {
            Print(state);
            return;
        }
        int available = ~(left | right | vertical) & ((1 << n) - 1);
        while (available != 0)
        {
            int x = available & -available;
            state.Add(x);
            Search(state, (left | x ) << 1, (right | x ) >> 1, vertical | x);
            state.RemoveAt(state.Count - 1);
            available &= ~x;
        }
    }

    private void Print(IList<int> state)
    {
        var result = new List<string>();
        var sb = new StringBuilder(n);
        foreach (var s in state)
        {
            var x = s;
            for (var i = 0; i < n; ++i)
            {
                sb.Append((x & 1) != 0 ? 'Q': '.');
                x >>= 1;
            }
            result.Add(sb.ToString());
            sb.Clear();
        }
        results.Add(result);
    }
}
```

<!-- tabs:end -->

<!-- end -->
