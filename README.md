# *Имя нашего сайта*

*Имя нашего сайта* - is not just your regular food delivery, it's also one of the best *RS2023Q1 graduation projects!* :smirk: 

## Getting Started :boom:

To run our project locally, you woud have to download zip file with our repository or run git clone.

### Prerequisites :computer:

What things do you need to run our project locally?


* Latest version of Node.js :boom:
* Installed .git :boom:
* Code Editor :boom:


### Installing :exclamation:

First make sure you have all the prerequisites installed and then run:

```
git clone git@github.com:Quiddlee/eCommerce-Application.git
```

Then navigate into project folder and run: 

```
npm install
```
To run a development server: 
```
npm run dev
```
Congratulations! :sunglasses:

## Running the tests :grimacing:

To run tests simply type in your console

```
npm run test
```

## Useful scripts :point_left:

Linting and Prettifying happens automatically when files are staged, however:

To manually run ESlint:

```
npm run lint
```

To manually run Prettier:

```
npm run format
```

## Adding products data to commerce tools:

For adding data of your products into commercetools we prepared [fully set upped repo](https://github.com/Tedzury/commercetools-sushisushi-data). If you want exactly same products, as we have, you just need to register your account at commercetools, clone example repo, insert .env file with your creds into cloned repo, and type few commands into terminal to upload all the data about products into your commercetools account. Detailed instructions will be provided in further reading. Nevertheless, you may feel free to modify data in any possible way you want to. Main steps and cornerstones will be covered in further reading. So, let's proceed into detailed instructions.

### Step-by-step guide

1. Clone [example repo](https://github.com/Tedzury/commercetools-sushisushi-data) into your computer. 
2. Register your account at commercetools. Go to Settings > Developer settings > Create new API client > Select needed scopes (Use predetermined admin scope or check out picture with our basic recomended scopes (scroll down for it). Don't fully focus on it, just create. You always can create new api client at any time and as much times as you need) > Create API client > (!important step) Scroll to bottom of web page, there will be select input with suggested options for downloading environment variables. Pick option to download in format .env file. Don't close this window until you download needed file, this info is shown only once and till you won't close the window.
3. After downloading, insert downloaded .env file into your cloned repo from first step. Remove suggested name from this file, so there is only left .env in file name. More detailed info with pictures is available at [original sunrisedata](https://github.com/commercetools/commercetools-sunrise-data) 
4. Open terminal at you cloned repo folder and type next instructions: npm run clean:categories && npm run import:categories && npm run clean:products && npm run import:products.

That is all. That simple, following this guide allows you to fully imitate our products data, that we used in our project.

### Remarks

And here will be some clues to add your own products into commerce tools. In our project we use only very limited info and options for our products. Commercetools provides much more larger management for products, categories, customers, prices, taxes, supply channels and so on, but in your project we don't need so much options, so used as little of it, as possible. In fact, we use only 2 minimal options to clean and then upload categories and products into api. 

4 files from cloned repo take part in this process: categories.csv, product-export-template.csv, product-type.json and products.csv. 

In file categories.csv you describe the categories you want to import and their hierarchy. Then, in product-export-template.csv you describe template for imported products, exactly what info or fields must be in every product description. product-type.json describes every non-standart field for product in details. And finally in products.csv you describe each of your product, that pattern must follow the product-export-template pattern. Important thing: each product occupies his own line in .csv file(!). To provide photos for products we created separate repo to store the photos, and in your products data we provide only links to the photos. 

Also in repo you can find SushiSushi menu.xlsx file. It contains exactly the same data as products.csv file, but it is much easier to edit data in xlsx file, then in csv file. Everything in this file is already set upped for comfort editing of products. If you want to edit products data: feel free to do it. You can change any data you want, just make sure it is suited for csv file. How it works: Each cell in product row is concatenated and separated with comma. Then this concatenated rows are concatenated into one line in one cell at the bottom of the file. Just copy paste the cell content into products.csv file. Make sure, that after copying the data - you separated each product into own line in .csv file, it is critical point. One more critical point - make sure that after copy/paste you left the header row at products.csv file. 

That is all you need to know about editing the product data for our project. To know more you should dive deep into commercetools docs, be observant, lucky and ready to struggle :)


Pic. #1 - Recommended scopes for basic commercetools api
![Recomended scopes for commerce tools account.](./src/assets/img/Recommended%20scoper%20CT.jpg)

## Built With :muscle:

* [React](https://react.dev/) - The web framework used
* [Redux](https://redux.js.org/) - State Management
* [Tailwind](https://tailwindcss.com/) - CSS Framework
* [Jest](https://jestjs.io/) - Testing Framework
* [Vite](https://vitejs.dev/) - Bundler

## Authors :alien: :alien: :alien:

* **Bogdan** - [Quiddlee](https://github.com/Quiddlee)
* **Oleksii** - [Tedzury](https://github.com/Tedzury)
* **Harry** - [barrydilan](https://github.com/barrydilan)

## License :mortar_board:

This project is licensed under the MIT License.

## Acknowledgments :collision:

:collision: :collision: :collision: We want to thank [RS-School](https://rs.school/) community
:collision: :collision: :collision: And especially our mentor, [Andrej Podlubnyj](https://github.com/andron13)
