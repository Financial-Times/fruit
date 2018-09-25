
# Heroku Deployment Guide

Running Fruit on [Heroku] is nice and easy compared to hosting on a server of your own. We provide manual instructions as well as a one-click button to get you set up.


## Table of Contents

  - [One-Click Setup](#one-click-setup)
  - [Manual Setup](#manual-setup)
  - [Questions and Troubleshooting](#questions-and-troubleshooting)


## One-Click Setup

The button below sets up a full Heroku application, including the required add-ons and configuration. You'll need a Heroku account to get started, and Fruit will run fine on the free tier which has a few limitations.

For most Heroku users, all you need to do is click the button and fill out a few fields. Then you'll have a running Fruit application.

[![Deploy to Heroku][heroku-button-image]][heroku-button-url]


## Manual Setup

To deploy Fruit to Heroku manually you'll need a Heroku account. Then follow the instructions below:

  1. Visit <https://dashboard.heroku.com/> and click the button to create a new app

  2. Fill out and submit the form with your application name

  3. Now we need to create a database. Click on the "Resources" tab and search under "Add-ons" for "Heroku Postgres". When it appears, click the name of the add-on

  4. In the pop-up, provision a "Hobby Dev" plan. As your Fruit database gets bigger you may need to increase this plan, but for now the free one is fine

  5. Now we need to add some configurations. Click on the "Settings" tab and then under "Config Variables", click "Reveal Config Vars"

  6. Now we're ready to deploy for the first time. Click on the "Deploy" tab and choose a deployment method. We recommend either Heroku Git, or connecting to a forked copy of Fruit on GitHub. Either way, the instructions in the Heroku interface should be helpful here

  7. Now you should be able to access your new application in-browser, click the "Open app" button that appears at the top of your dashboard in Heroku. A Fruit page should load

  8. You're ready to start using Fruit!


## Questions and Troubleshooting

Here we outline some common questions and issues around deploying to Heroku.

### I see a Heroku error page when I visit my application

This is likely due to a missing deployment, your code may not be on your Heroku app yet. Check the [Heroku deployment guide][heroku-deployment] for help.

### When does the database migrate?

We migrate the database during the [Heroku release phase][heroku-release-phase]. This means that your database is up-to-date as soon as the new deployment completes.

### Can I use Heroku preboot?

No. [Heroku's preboot feature][heroku-preboot] allows for zero downtime deployments and ensures that traffic can be received by a new deployment before switching out the production dynos. This doesn't play nicely with Fruit due to the fact we use [Heroku release phases][heroku-release-phase] to migrate the database, and this happens _before_ the dynos switch over.



[config]: https://github.com/Financial-Times/fruit#configuration
[heroku]: https://www.heroku.com/
[heroku-button-image]: https://www.herokucdn.com/deploy/button.svg
[heroku-button-url]: https://heroku.com/deploy?template=https://github.com/Financial-Times/fruit
[heroku-deployment]: https://devcenter.heroku.com/categories/deployment
[heroku-preboot]: https://devcenter.heroku.com/articles/preboot
[heroku-release-phase]: https://devcenter.heroku.com/articles/release-phase
