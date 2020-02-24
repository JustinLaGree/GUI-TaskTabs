Task Tabs

Working in Git as a group

First things first, we need the repo. So go grab it either it in the command line
using the Clone with SSH option.

git clone  git@github.com:JustinLaGree/GUI-TaskTabs.git

Now that's out of the way, some important concepts should be mentioned to make it clear how to do this
as a group, because there are some rules to it.

If you've only worked in git before solo, you probably pushed directly to master whenever you wanted to
update the repo. Alone this works fine because no one else is using the repo and it can't cause issues
for anyone but you.

As a group however we want to **avoid pushing to master completely** and instead use **Pull Requests**.
Pull Requests are a way to upload proposed changes and other group members approve them and then the approved changes
get merged with the master branch.
Some info about that here: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests

The idea is to clone master and make your own branch, manipulate that as you please instead of master and then upload your
proposed changes, which members of the group approve.

Taking that step by step...
This will create a new copy or "branch" from your current repo. Just make sure that the repo that you are currently on is the master branch. However, this isn't necessarily up to date with the github version, so we quickly need to make sure it is. Simply type the following command on your local master.

$ git pull

Once you've updated your local master to match the github, you can make your own branch.

$ git checkout -b [name_of_your_new_branch]

Once you've made your own branch, you can edit it however you'd like and it won't affect the master branch.

I find it helpful to start the name of a branch with your name/initials and then what the branch does.
For example this will be sb/guide

On the topic of making commits...
You should try to make your commits clear and have only one "goal" per commit, with a commit message that explains what the goal was.
The goal is to avoid this: https://xkcd.com/1296/
And instead follow this: https://seesparkbox.com/foundry/atomic_commits_with_git
It's not something you'll learn just from a guide, so I won't go into incredible detail, but when we review each other's work it will
make everyone's lives easier if the commits are easy to follow.

Once in your own branch you can commit whatever changes you please and use the following command to publish to github

$ git push origin [name_of_your_new_branch]

Now if you push the Branch button on Github you should see your branch listed.
Follow this to make a new Pull Request: https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request

Now you've made yourself a new Pull Request, and naturally master isn't changed at all because no one's approved it yet.
Multiple other people should take a look at other people's work and approve it. Be gentle yet informative with criticism, and
don't be afraid to be wrong in both giving and receiving it.

Github also has a guide on how to review Pull Requests here: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-review

Don't be afraid to ask questions, both on and off of github. I know this might look like a lot, but soon it'll be second nature. I believe in you.
