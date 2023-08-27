# Git

## 远程仓库与本地仓库关联

### 1.本地设置账户信息
```bash
git config --global user.name "用户名"
git config --global user.email "用户邮箱"
```

### 2.本地创建项目
```bash
mkdir h5-study-demo
cd h5-study-demo
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/zy3329929364/h5-study-demo.git
git push -u origin "master"
```
### 3.本地已有项目/仓库
```bash
cd existing_git_repo
git remote add origin https://gitee.com/zy3329929364/h5-study-demo.git
git push -u origin "master"
```

## 账户安全问题
如果本地没有仓库验证账户信息，那么每次提交时，都会让你输入账户和密码。
```bash
git config credential.helper store
```
在这之后你只需要再输⼊⼀次密码， Git 就会把你的密
码保存下来，这之后就再也不⽤输⼊了。说它「安全性
低」，是因为这条指令会让 Git 把你的密码以明⽂形式
保存在你的电脑上。具体这两种保存密码的⽅案选择哪
个，看你⾃⼰了。
## 分支Branch
```bash
git branch	List all local branches.
git branch -a	List remote and local branches.
git checkout -b branch_name	Create a local branch and switch to it.
git checkout branch_name	Switch to an existing branch.
git push origin branch_name	Push branch to remote.
git branch -m new_name	Rename current branch.
git branch -d branch_name	Delete a local branch.
git push origin --delete branch_name	Delete a remote branch.
```
### 删除分支
```bash
git branch -d feature1
```
1. HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的
branch，需要先⽤ checkout 把 HEAD 指向其他地⽅。
2. 由于 Git 中的 branch 只是⼀个引⽤，所以删除 branch 的操
作也只会删掉这个引⽤，并不会删除任何的 commit。（不过如果⼀个 commit 不在任何⼀个 branch 的「路径」上，或者换句话说，如果没有任何⼀个 branch 可以回溯到这条
commit（也许可以称为野⽣ commit？），那么在⼀定时间后，它会被 Git 的回收机制删除掉。）
3. 出于安全考虑，没有被合并到 master 过的 branch 在删除时
会失败（因为怕你误删掉「未完成」的 branch 啊）：
这种情况如果你确认是要删除这个 branch （例如某个未完成的功能被团队确认永久毙掉了，不再做了），可以把 -d 改成-D，⼩写换成⼤写，就能删除了。