_Question 1_

From: marissa@startup.com  
Subject: Bad design

Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Thanks,  
Marissa

**From:** paulina@algolia.com 
**Subject:** Re: Bad design

Hi Marissa,

Thank you for taking the time to share this — I've noted your feedback and will pass it on.

Since you're iterating frequently, the API or CLI might actually be the quicker route altogether.
Happy to jump on a quick call and show you if that'd be useful?

Thanks, Paulina

--

_Question 2_:

From: carrie@coffee.com  
Subject: URGENT ISSUE WITH PRODUCTION!!!!

Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".

Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?

Please advise on how to fix this. Thanks.

**From:** paulina@algolia.com
**Subject:** Re: URGENT ISSUE WITH PRODUCTION!!!!

Hi Carrie,

Sorry to hear this is causing issues in production — let's get it sorted.

This isn’t a plan limitation. The error means some of the records being sent to Algolia are exceeding the maximum record size limit.

Since you mentioned storing metadata that isn’t used for search, the fix is to move that data out of Algolia and keep it in your own database, connecting the two with a shared ID. Algolia only needs the fields it’s actually searching through.

I'd be happy to jump on a call and walk you through it today — what time works for you?

Thanks,
Paulina

--

_Question 3_:

From: marc@hotmail.com  
Subject: Error on website

Hi, my website is not working and here's the error:

![error message](./error.png)

Can you fix it please?


**From:** paulina@algolia.com
**Subject:** Re: Error on website


Hi Marc, 

Thanks for sending the screenshot.

The error usually means Searchkit either hasn’t been installed correctly or isn’t being imported into your project.

A quick fix to try is:

npm install searchkit

and then adding:

import Searchkit from 'searchkit';

at the top of the relevant file.

If you weren’t intentionally using Searchkit, it may just be an old reference somewhere in the code instead. Either way, happy to jump on a quick call and sort it out together if that’s easier.

Thanks,
Paulina