#!/bin/bash
yarn start IONInteractive ./base/ioninteractive.json >> ioninteractive.log
yarn start VisuallyPlatform ./base/visuallyplatform.json >> visuallyplatform.log
yarn start Engage ./base/engage.json >> engage.log
yarn start Engineering ./base/engineering.json >> engineering.log
yarn start PartnerPortal ./base/partnerportal.json >> partnerportal.log
