#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Feb  5 22:50:12 2019

@author: maverick
"""

import pandas as pd
import numpy as np

data = pd.read_csv('data/googleplaystore.csv')

data.drop_duplicates(subset='App', inplace=True)

data = data[data['Installs'] != 'Free'][data['Installs'] != 'Paid']

data['Installs'] = data['Installs'].apply(lambda x: x.replace('+', '') if '+' in str(x) else x)
data['Installs'] = data['Installs'].apply(lambda x: x.replace(',', '') if ',' in str(x) else x)

# - Size : Remove 'M', Replace 'k' and divide by 10^-3

data['Size'] = data['Size'].apply(lambda x: np.nan if 'Varies with device' in str(x) else x)
data['Size'] = data['Size'].apply(lambda x: str(x).replace('M', '') if 'M' in str(x) else x)
data['Size'] = data['Size'].apply(lambda x: str(x).replace(',', '') if ',' in str(x) else x)
data['Size'] = data['Size'].apply(lambda x: float(str(x).replace('k', '')) / 1000 if 'k' in str(x) else x)

data['Price'] = data['Price'].apply(lambda x: str(x).replace('$', '') if '$' in str(x) else str(x))

data["Price"] = data['Price'].astype('float')
data["Reviews"] = data['Reviews'][data.Reviews!=0].astype('int')
data["Installs"] = data['Installs'][data.Installs!=0].astype('int')
data["Size"] = data['Size'].astype('float')

data.fillna(data.mean(), inplace=True)


appsnumber_in_catagory = data['Category'].value_counts().sort_values(ascending=True)
x.to_csv("./static/toplot/ratinghistogram.csv")

print('Average app rating = ', x.mean())
mean_rating = data[["Rating", "Category"]]. groupby("Category").mean().sort_values(by="Category", ascending=True)["Rating"]

data =data.groupby('Category').sum().sort_values(by="Category", ascending=True)
data["Rating"] = mean_rating

downloads_rating_reviews = data[["Rating", "Reviews", "Installs"]]
downloads_rating_reviews.to_csv('./static/toplot/downloads_rating_reviews.csv')
mean_rating_in_category.to_csv('./static/toplot/mean_rating_in_category.csv')

rating_per_category = data[["Category", "Rating"]]
rating_per_category.to_csv('./static/toplot/rating_per_category.csv', index=False)

rating_per_size = data[["Size", "Rating"]]
rating_per_size.to_csv('./static/toplot/rating_per_size.csv', index=False)

rating_per_price = data[["Price", "Rating"]]
rating_per_price.to_csv('./static/toplot/rating_per_price.csv', index=False)

installs_per_price = data[["Price", "Installs"]]
installs_per_price.to_csv('./static/toplot/installs_per_price.csv', index=False)

data["Price"] = data["Price"].apply(lambda x: 1 if x else 0)
rating_to_size_for_differrent_prices = data[["Price", "Size", "Rating"]]
rating_to_size_for_differrent_prices.to_csv('./static/toplot/rating_to_size_for_differrent_prices.csv', index=False)

data1 = pd.read_csv('./static/toplot/review_sentiment_type.csv')
# data1.drop(columns=['Unnamed: 0'], inplace=True)
data1.to_csv('./static/toplot/review_sentiment_type.csv', index=False)


reviews_vs_downloads = data[["Reviews", "Installs"]]
reviews_vs_downloads.to_csv('./static/toplot/reviews_vs_downloads.csv', index=False)
groups = data.groupby('Category').filter(lambda x: len(x) >=170).reset_index()
