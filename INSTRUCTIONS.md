# Technical Interviews

As an engineering candidate you have been pointed here as part of the interview process.

We are providing a simple data file, `helpful-reviews.json` as part of the exercise. During the interview you will be asked to solve a challenge, and will be live-coding it with other engineers present.

The language of preference at RevDoc is Typescript, however you can also do the exercises in Javascript or Python if you are more comfortable.

## The Interview

> The primary goal of this interview is to get a feeling for your current understanding of the language, and how to apply engineering concepts to achieve stated goals. Another goal is to see how you are when coding with others - the engineers are not here to shoot you down, so speak up! This should be a fun exercise.

You will be on a zoom call for one hour, with several RevDoc engineers. When you join the call, you will be asked to share your screen, and then given one of the challenges listed below to complete. Although you have the entire hour to complete the challenge, you should be done far sooner as we are hoping to have a conversation with you afterwards about your implementation strategy, as well as a chance to discuss the interview itself from the candidate's perspective.

Technical interviews can be scary. We are deliberately choosing a more simple exercise as a conversation starter, and to give us a chance to see how coding with you is like, as well as giving you the same opportunity to check us out.

## The Challenges

There are a couple challenges to choose from, and this list will evolve over time.

### Challenge One

Write a program that can take an incoming number from the command line, and output a list of products that have been reviewed that many times, from the supplied data file. You choose what data to include in your output.

An example to call your program:
```
./myscript 50
```
This should produce a list of products from the data file that have been reviewed exactly 50 times.

### Challenge Two

Write a program that parses the supplied data file, and produces a list of products sorted by the highest aggregate _helpful_ score. This list must also account for products with multiple reviews, giving priority to products with more reviews over products with the same score but fewer reviews. You choose what data to include in your output.

### Challenge Three

Write a program that parses the supplied data file, and produces a list of products that have multiple reviews in that data file. You choose what data to include in your output.

---
## Source Information

This data is provided by the [AWS Open Data Set](https://registry.opendata.aws/) and the original data files can be found [here](https://registry.opendata.aws/helpful-sentences-from-reviews/).