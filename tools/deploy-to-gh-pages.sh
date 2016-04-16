#!/bin/bash

git config user.name "Ben Fletcher"
git config user.email "bjfletcher@gmail.com"

# PUSH PUBLIC TO GH-PAGES

# Move to a clean gh-pages branch
if [ "$(git branch | grep gh-pages)" != "" ]
then
	git branch -D gh-pages
fi
git checkout -b gh-pages

# Remove everything but the public folder
echo "Removing non-deployment files..."
for x in $(git ls-files | grep -v "^public/")
do
	git rm $x
done

# Move everything from the public folder into to root folder
cd public
for x in $(ls -A)
do
	mv $x ..
	git add ../$x
done
for x in $(git ls-files)
do
	git rm $x
done
cd -

# Push to gh-pages
git commit --allow-empty -m "$(git log -1 --pretty=%B) [ci skip]"
git push -f $(git config --get remote.origin.url) gh-pages

# Move back to previous branch
git checkout -

echo "Deployed."
