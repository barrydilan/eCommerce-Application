# <img src="./src/assets//icons//logo.svg" width="70px"><img>  **SushiSushi | RS-School Stage 2 Final Task**

**SushiSushi** - Is not just your regular food delivery, it's also one of the best *RS2023Q1 graduation projects!* 😏

# Getting Started 🚀

To run our project locally, you woud have to **download zip** file with our repository or **clone** it to your computer. 🦥

## Setup and Running ⚠️

What things do you need to do in order to run our project locally? 🤔


* Use node 18.x or higher. ⚡
* Installed .git on your computer. ✌️
* Code Editor of your choice. 📝
* Installed npm. 📦
* Created [commercetools](https://docs.commercetools.com/) account. 🌐


## Instalation And Preparation ⬇️

 First make sure you have all the things listed in the previous section. Then clone our repository to your computer: 👌

```
git clone git@github.com:Quiddlee/eCommerce-Application.git
```

or download zip file manually with our repository. 😏

Navigate into project folder and run: 📦 

```
npm install
```

Create ```.env``` file in the root of the project and add your commercetools credentials 🔥.

You can find ```.env.example``` as an example file in the project root or follow the lines below: 🐺


```TS
VITE_PROJECT_KEY=PROJECT_KEY
VITE_CLIENT_SECRET=CLIENT_SECRET
VITE_CLIENT_ID=CLIENT_ID
VITE_AUTH_SERVICE_URL=AUTH_SERVICE_URL
VITE_API_HOST_URL=API_HOST_URL
VITE_DEFAULT_CUSTOMER_SCOPE=DEFAULT_CUSTOMER_SCOPE
```

Finally run a development server: 🤩
```
npm run dev
```
Aaaaand you're done! 🎉🥳


## Available Scripts 🥑

Here you can find all the scripts that are available in our project. 🦚

Linting and Prettifying happens automatically when files are staged 😎, however you can do it manually with absolutely no problems:

Lint the App with **ESlint**: ✔️

```
npm run lint
```

Format the App with **Prettier**: 🧹

```
npm run format
```

Type check the App with **TypeScript**: 📝

```
npm run type-check
```

Install **Husky** to enable pre-commit hooks: 🎣

```
npm run prepare
```

Run unit-tests with  **Vitest**: 🧪

```
npm run test
```

**Build** project for production: 🏗️

```
npm run build
```

**Preview** the **production build** locally: 👀

```
npm run preview
```

## Adding products data to commerce tools:
Here you can find detailed instructions on how to add products data to commercetools 🕵️.

To add data with products in commercetools we prepared [fully setted up repo](https://github.com/Tedzury/commercetools-sushisushi-data) for you 🫂.

 If you want exactly the same products as we have 😏:
 * You need to follow all the [Instalation and Preparation]() steps. ⛔
 * Aaaand Type a few 🤏 commands into the terminal to upload all the data into your commercetools account! 🤩


Detailed instructions will be provided in further reading.
  
Nevertheless, you may feel free to modify data in any possible way you want to 🤝.

Main steps and cornerstones will be covered in further reading. So, let's proceed into detailed instructions. ⏩

# Step-by-step guide on how to add your own products data to commercetools 😇

To add your own products data to commercetools you need to follow next steps 🦝:

* Clone [example repo](https://github.com/Tedzury/commercetools-sushisushi-data) into your computer. 😶‍🌫️

* Register your account at commercetools.
 Go to ```Settings > Developer settings > Create new API client > Select predefined Admin scope > Create API client``` > 
 
 **⚠️ !important step ⚠️** Scroll to bottom of web page, there will be **select input** 👇 with suggested options for downloading environment variables.
 
Pick option to download in format ```.env``` file. **Don't close this window** 🚨 until you download all the files needed, this info is shown only **once** 🙀 till you won't close the window 🍃. 


3. After downloading, insert downloaded .env file into your cloned repo from first step. Remove suggested name from this file, so there is only left .env in file name. More detailed info with pictures is available at [original sunrisedata](https://github.com/commercetools/commercetools-sunrise-data) 
4. Open terminal at you cloned repo folder and type next instructions: npm run clean:categories && npm run import:categories && npm run clean:products && npm run import:products.

That is all. That simple, following this guide allows you to fully imitate our products data, that we used in our project.

### Remarks

And here will be some clues to add your own products into commerce tools. In our project we use only very limited info and options for our products. Commercetools provides much more larger management for products, categories, customers, prices, taxes, supply channels and so on, but in your project we don't need so much options, so used as little of it, as possible. In fact, we use only 2 minimal options to clean and then upload categories and products into api. 

4 files from cloned repo take part in this process: categories.csv, product-export-template.csv, product-type.json and products.csv. 

In file categories.csv you describe the categories you want to import and their hierarchy. Then, in product-export-template.csv you describe template for imported products, exactly what info or fields must be in every product description. product-type.json describes every non-standart field for product in details. And finally in products.csv you describe each of your product, that pattern must follow the product-export-template pattern. Important thing: each product occupies his own line in .csv file(!). To provide photos for products we created separate repo to store the photos, and in your products data we provide only links to the photos. 

Also in repo you can find SushiSushi menu.xlsx file. It contains exactly the same data as products.csv file, but it is much easier to edit data in xlsx file, then in csv file. Everything in this file is already set upped for comfort editing of products. If you want to edit products data: feel free to do it. You can change any data you want, just make sure it is suited for csv file. How it works: Each cell in product row is concatenated and separated with comma. Then this concatenated rows are concatenated into one line in one cell at the bottom of the file. Just copy paste the cell content into products.csv file. Make sure, that after copying the data - you separated each product into own line in .csv file, it is critical point. One more critical point - make sure that after copy/paste you left the header row at products.csv file. 

That is all you need to know about editing the product data for our project. To know more you should dive deep into commercetools docs, be observant, lucky and ready to struggle :

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
