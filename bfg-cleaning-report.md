`bfg` commands used to clean student data from the repo, before open-sourcing it to the public:

```
bfg --delete-files /course-list.txt
bfg --delete-files /groups.json
bfg --delete-files *.log
bfg --delete-files *.txt
bfg --delete-files students*.json
bfg --delete-files submissions*.json
bfg --delete-files submissions*.html
bfg --delete-files submissions*.pdf
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```
