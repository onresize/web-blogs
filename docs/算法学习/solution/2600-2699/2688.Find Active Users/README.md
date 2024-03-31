# [2688. 查找活跃用户](https://leetcode.cn/problems/find-active-users)

[English Version](/solution/2600-2699/2688.Find%20Active%20Users/README_EN.md)

<!-- tags:数据库 -->

## 题目描述

<!-- 这里写题目描述 -->

<p><font face="monospace"><code>Users</code> 表：</font></p>

<pre>
+-------------+----------+ 
| 字段名       | 类型      | 
+-------------+----------+ 
| user_id     | int      | 
| item        | varchar  |
| created_at  | datetime |
| amount      | int      |
+-------------+----------+
在这个表可能包含重复的记录。
每一行包括 user_id、购买的商品、购买日期和购买金额。</pre>

<p>编写一个解决方案，找出活跃用户。活跃用户是指在其任何一次购买之后的 <strong>七天内</strong>&nbsp;进行了第二次购买的用户。</p>

<p>例如，如果结束日期是 2023年5月31日，那么在 2023年5月31日 和 2023年6月7日之间（包括这两天）的任何日期都被视为"在7天内"。</p>

<p>返回 <strong>任意顺序</strong> 的 <code>user_id</code> 列表，表示活跃用户列表。</p>

<p>结果的格式如下示例：</p>

<p>&nbsp;</p>

<p><b>示例 1：</b></p>

<pre>
<strong>输入：
</strong>Users 表:
+---------+-------------------+------------+--------+ 
| user_id | item              | created_at | amount |  
+---------+-------------------+------------+--------+
| 5       | Smart Crock Pot   | 2021-09-18 | 698882 |
| 6       | Smart Lock        | 2021-09-14 | 11487  |
| 6       | Smart Thermostat  | 2021-09-10 | 674762 |
| 8       | Smart Light Strip | 2021-09-29 | 630773 |
| 4       | Smart Cat Feeder  | 2021-09-02 | 693545 |
| 4       | Smart Bed         | 2021-09-13 | 170249 |
+---------+-------------------+------------+--------+ 
<b>输出：</b>
+---------+
| user_id | 
+---------+
| 6       | 
+---------+
<b>解释：</b>
– user_id 为 5 的用户只有一笔交易，因此他不是活跃用户。
– user_id 为 6 的用户有两笔交易，第一笔交易是在2021年9月10日，第二笔交易是在2021年9月14日。第一笔和第二笔交易之间的时间间隔小于等于7天。因此，他是一个活跃用户。
– user_id 为 8 的用户只有一笔交易，因此他不是活跃用户。
– user_id 为 4 的用户有两笔交易，第一笔交易是在2021年9月2日，第二笔交易是在2021年9月13日。第一笔和第二笔交易之间的时间间隔大于7天。因此，他不是活跃用户。</pre>

## 解法

### 方法一

<!-- tabs:start -->

```sql
# Write your MySQL query statement
SELECT DISTINCT
    user_id
FROM Users
WHERE
    user_id IN (
        SELECT
            user_id
        FROM
            (
                SELECT
                    user_id,
                    created_at,
                    LAG(created_at, 1) OVER (
                        PARTITION BY user_id
                        ORDER BY created_at
                    ) AS prev_created_at
                FROM Users
            ) AS t
        WHERE DATEDIFF(created_at, prev_created_at) <= 7
    );
```

<!-- tabs:end -->

<!-- end -->
