# kb-sport-ranking-table-converter
An AWS Lambda function that converts a Kettlebell Sport Ranking Table into a relational database

## Installation
TBD

## Background/Motivation
The gym I attend (which is focused on kettlebell training among other thigns) has an annual
competition in December. Last year I helped with the scoring for this competition. All of the
contestant information (such as registered events and current weight) had to be inputted into an
Excel sheet, which also contained the formula(e) for calculating a contestant's score in a
particular event. After this, we had to reference an Excel-like table in a PDF document with the
contestant information and the score to see where the contestant ranked.

It was a time consuming process and was prone to human error. Even so, the contestants and audience
thought it was the best run event because for the first time we scored as the contestants competed
instead of after all events had finished.

Given all this, I thought automating at least part of this process would make my life much easier
the following year when I scored again.

## Overview
This service automates the final part of the scoring process: finding the rank of a contestant given
performance in a particular event. The service accepts an official Kettlebell Sport ranking table
PDF file and loads a relational database with the data from it.

## Technical Decisions
TBD

## Resources

* [OKC 2017 Ranking Table](http://orangekettlebellclub.com/keta-ranking-table-2017/)