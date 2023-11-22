# 🍣 **SushiSushi — eCommerce-Application**

*RS-School 🦥 eCommerce-Application. Stage 2 Final Task RS2023Q1* 🧙‍ <br>
️***SushiSushi** - Is not just your regular food delivery; it's a culinary journey to Japan's finest flavors, delivered to your doorstep 😉.* 

**🏆🥳 One of the best RS2023Q1 [graduation projects](https://discord.com/channels/516715744646660106/1072962541812191423/1156268411123408926)!**

**Task description** - [Task description](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/eCommerce-Application) 📝 <br>
**Deployed project preview** - [SushiSushi](https://quiddlee.github.io/eCommerce-Application/) 👀

# Getting Started 🚀

To run our project locally, you would have to **download zip** file with our repository or **clone** it to your computer. ✨

## Setup and Running ⚠️

What things do you need to do in order to run our project locally? 🤔


* Use node 18.x or higher. ⚡
* Installed [.git](https://git-scm.com/) on your computer. ✌️
* Code Editor of your choice. 📝
* Installed [npm](https://www.npmjs.com/). 📦
* Created [commercetools](https://docs.commercetools.com/) account. 🌐


## Installation And Preparation ⬇️

 First make sure you have all the things listed in the previous section. Then clone our repository to your computer: 👌

```
git clone git@github.com:Quiddlee/eCommerce-Application.git
```

or download zip file manually with our repository 😏.

Navigate into project folder and run 📦:

```
npm install
```

Create ```.env``` file in the root of the project and add your commercetools credentials 🔥.

You can find ```.env.example``` as an example file in the project root or follow the lines below 🐺:


```dotenv
VITE_PROJECT_KEY=PROJECT_KEY
VITE_CLIENT_SECRET=CLIENT_SECRET
VITE_CLIENT_ID=CLIENT_ID
VITE_AUTH_SERVICE_URL=AUTH_SERVICE_URL
VITE_API_HOST_URL=API_HOST_URL
VITE_DEFAULT_CUSTOMER_SCOPE=DEFAULT_CUSTOMER_SCOPE
```

Follow the [step by step guide](#adding-products-data-to-commerce-tools-) on how to add your own products data to commercetools 🦩.

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

# Features 🚀

* **Browse the world of royal asian flavour meals! 😃🍣**

![gif-1](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/3d3e9cfe-20cc-4f67-8890-08748e8fdc31)

* **Choose the meal you like the most 😋🍴**

<img src="https://github.com/Quiddlee/eCommerce-Application/assets/114234698/6e3ef9f9-ec15-421d-83f3-a9bdc2beeac2" width="800px">

* **Fill your shopping cart 🛍️🛒**

![gif-2](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/df2b1cb3-ba0d-43be-9aeb-80ecd9d5a16e)

* **Search for your lovely meals! 🔍**

![gif-3](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/fbd16e70-1095-4726-a915-758c8fb1d71d)

* **Filter the results to make easier your search 😊**

![gif-4](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/3cec92b9-0c43-4af6-98cc-054a1739fe9f)

* **Sign up your account! 🌌**

![gif-6](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/d5a7ccfb-8ad6-42a3-856b-3b53e6f0dc7c)

* **Change your data at any time 👌**

![gif-5](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/6e8138e9-66ef-468e-b009-6a1d1106ebeb)

* **Beautiful Mobile App, and much much more features, try by yourself 😉!**

<img src="https://github.com/Quiddlee/eCommerce-Application/assets/114234698/42d15ba0-1594-45e8-a54b-a36f503f81e5" height="500px">
<img src="https://github.com/Quiddlee/eCommerce-Application/assets/114234698/4a5838f3-7cf1-4d48-868a-a2e706ee9903" height="500px">
<img src="https://github.com/Quiddlee/eCommerce-Application/assets/114234698/4077c659-9d4e-4bda-a9f8-c80b55ee6f42" height="500px">

# Technology Stack ⚙️

### **Developing 😍**
* [React.js](https://react.dev/) - **The web framework used** ⚛️
* [Redux / RTK Query](https://redux.js.org/) - **The State Management Tool and Data Fetching Library** 🧰
* [React Router Dom](https://reactrouter.com/) - **The Router** 📍
* [TypeScript](https://www.typescriptlang.org/) - **The Language** 💖
* [Tailwind](https://tailwindcss.com/) - **The CSS Framework** 🍃
* [Vite](https://vitejs.dev/) - **The Bundler 📦**
* [Postman](https://www.postman.com/) - **The API Testing Tool** 📬

### **Code Quality 🧹**
* [Vitest](https://vitest.dev/) - **The Test Runner** 🧪
* [Testing Library](https://testing-library.com/) - **The Testing Framework** 🫂
* [ESLint — Air-bnb base](https://eslint.org/) - **The Linter** 🔔
* [Prettier](https://prettier.io/) - **The Code Formatter** 👏
* [Husky](https://typicode.github.io/husky/#/) - **The Pre-commit Hooks** 🪝
* [Lint Staged]() - **The Pre-commit Hooks** 🦚
* [EditorConfig](https://editorconfig.org/) - **The Code Style Enforcer** 😎


### **External Libraries 📚**
* [Formik](https://formik.org/) - **The Form Validation Library** 🙏
* [Yup](https://github.com/jquense/yup) - **The Form Validation Schema Builder** 🏛️
* [Framer Motion](https://www.framer.com/motion/) - **The Animation Library** 😍
* [Swiper](https://swiperjs.com/) - **The Slider Library** 🛝
* [React Infinite Scroll Component](https://github.com/ankeetmaini/react-infinite-scroll-component) - **The Infinite Scroll Library** ♾️
* [React Zoom Pan Pinch](https://github.com/BetterTyped/react-zoom-pan-pinch) - **The Image Zoom Library** 🔍
* [Async Mutex](https://github.com/DirtyHairy/async-mutex#readme) - **The Async Mutex Library** 🤖
* [React Star Rating Component](https://github.com/raymon-zhang/react-star-rate) - **The Star Rating Component** ⭐

### **Design 🎨**
* [Figma](https://www.figma.com/) - **The Design Tool** 🎨
* [Project Design](https://www.figma.com/file/rYRBs7GD0vDQDjgjU0n972/eCommerce-Application-%F0%9F%8C%90?type=design&node-id=0%3A1&mode=design&t=asbvxijfRHlGg8Uz-1) - **The Project Design** 😉
![img_9](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/0d1edaa7-1eb5-4fb2-ad19-1589037968b9)

### **Git Methodology**
* [Git Flow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) - **The Git Flow** 🌊

### **Architecture 🏛️**
* [Feature Sliced Design](https://feature-sliced.design/) - **The Architecture** 🏛️

### **API 📡**
* [Commercetools](https://docs.commercetools.com/) - **The API** 🦖

![img_4](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/8b582001-a67d-4d09-b8a7-2ebea68d542b)

### **CI/CD 🚀**
* [GitHub Actions](https://pages.github.com/) - **The CI/CD** 🕊️

![img_5](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/84db0b98-fd9d-4717-a1d3-14919ca63a46)

### **Project Management 📈**
* [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) - **The Project Management Tool** 📊

![img_6](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/7cb7743d-2a30-4d68-8c19-2d539e0821c4)
![img_1](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/0082f31f-26fe-4458-9f6b-fcfcc5f079eb)
![img_8](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/2dca6b9b-e2b1-4df2-80ab-f53aff0ccd8a)

### **Communication 📣**
* [Discord](https://discord.com/) - **The 3xWeek Meeting Communication Tool** 🗣️
* [Telegram](https://web.telegram.org/) - **The Main Chatting Communication Tool** 💬

### **Project planing 🦍**
* [Lucidchart](https://www.lucidchart.com/) - **The Project planing Tool** 🧠
![eCommerce-Application](https://github.com/Quiddlee/eCommerce-Application/assets/114234698/5749689e-e893-4359-ae15-15bf3cf968dd)

# Core Development Team 👨‍💻

### **Bohdan Shcherbyna** - **Front-end Developer / Team Lead** 🦁

<img height="400px" src="src/assets/img/Bogdan.jpg">

### Contribution 🪄:
* Working with the API 🌐
* Managing the Redux store 🏪
* Animations 🦕
* UI/UX Design 🍭
* Code review 🔫
* Testing 🧪
* Deployment 🚀
* Documentation 📃
* CI/CD ✨

### Contact 👋:
* Email - ```bogdanscherbinadev@gmail.com``` 📬
* Linkedin - [Bohdan Shcherbyna](https://www.linkedin.com/in/quiddle/) ✒️
* Telegram - [@Quiddle](https://t.me/quiddle) 📱
* GitHub - [Quiddlee](https://github.com/Quiddlee) 🦉

#

### **Oleksii Drohachov** - **Front-end Developer** 🦈

<img height="400px" src="src/assets/img/Oleksii.jpg">

### Contribution 🪄:
* Managing the app router 🛖
* Code review 🔫
* Documentation 📃
* Working with CommerceTools data 💀
* Managing app products 💎
* Fully implement user profile page 💪
* UI layout 🦥
* Project setup 💫
* Working with the API 🩺

### Contact 👋:
* Email - ```asdrogachev@gmail.com``` 📬
* Linkedin - [Oleksii Drohachov](https://www.linkedin.com/in/oleksii-drohachov-b127a9245/) ✒️
* Telegram - [@Tedzury](https://t.me/tedzury) 📱
* GutHub - [Tedzury](https://github.com/Tedzury) 🦉

#

### **Harry Holubiev** - **Front-end Developer** 🐲

<img height="400px" src="src/assets/img/Harry.jpg">

### Contribution 🪄:
* Designed product card 🎴
* Product page 📄
* Logo and animations 🍣
* implemented some features in Cart component 🛒
* Managing the app router 🛖
* Code review 🔫
* Documentation 📃
* UI Layout 🦥
* Working with the API 🪄

### Contact 👋:
* Email - ```queharambe@gmail.com``` 📬
* GitHub - [barrydilan](https://github.com/barrydilan) 🦉

# Adding products data to commerce tools 🦩:
Here you can find detailed instructions on how to add products data to commercetools 🕵️. To add data with products in commercetools we prepared [fully setted up repo](https://github.com/Tedzury/commercetools-sushisushi-data) for you 🫂.

If you want exactly the same products as we have 😏:
* You need to follow all the [Installation and Preparation](#Installation And Preparation) steps. ⛔
* Aaand type a few 🤏 commands into the terminal to upload all the data into your commercetools account! 🤩


Detailed instructions will be provided in further reading.
Nevertheless, feel free to modify data in any possible way you want 🤝. Main steps and cornerstones will be covered in further reading. So, let's proceed into detailed instructions. ⏩

# Step-by-step guide on how to add your own products data to commercetools 😇

To add your own products data to commercetools you need to follow next steps 🦝:

* Clone [example repo](https://github.com/Tedzury/commercetools-sushisushi-data) into your computer. 😶‍🌫️

* Register your account at commercetools.

* Go to ```Settings > Developer settings > Create new API client > Select predefined Admin scope > Create API client```

* **⚠️ !important step ⚠️** Scroll to bottom of web page, there will be **select input** 👇 with suggested options for downloading environment variables.

* Pick option to download in format ```.env``` file. **Don't close this window 🚨 until you download all the files needed**, info is shown only **once** 😱 till you won't close the window 🍃.


* After downloading 📩, insert downloaded ```.env``` file into your cloned repo from first step. Remove 🧹 suggested name from this file, so there is only left ```.env``` in file name. More detailed info with pictures is available at [original sunrisedata](https://github.com/commercetools/commercetools-sunrise-data) 💨
* **Open terminal** 🧑‍💻 inside the **root folder** of the cloned repo and type next instructions: ```npm run clean:categories && npm run import:categories && npm run clean:products && npm run import:products```.

And that all! 😊 That simple, following this guide allows you to fully imitate our products data, that we used in our project. 😉

# Remarks and additional info 📢:

And here will be some clues to add your own products into commerce tools 🧩.

In our project we use very limited info and options for our products 🤐. Commercetools provides much more larger management for products 🍀, categories, customers, prices, taxes, supply channels and so on 🤯, but in our case we ain't needed so much options 🧟‍♂️, so we used as little of it, as possible. In fact, we use only 2 minimal options to clean and then upload categories and products into api 😅.

**4 main files** from cloned repo take part in this process: ```categories.csv, product-export-template.csv, product-type.json and products.csv``` 🫠.

1. In the ```categories.csv``` file you describe the categories you want to import and their hierarchy 🦁.

2. Then, in ```product-export-template.csv``` you describe template for imported products 🏛️, **exactly what info or fields must be in every product description**.

3. ```product-type.json``` describes every non-standard field for product in details 🫣.

4. And finally 🙂 in ```products.csv``` **you describe each of your product, that pattern must follow the** ```product-export-template pattern```.

# **Important thing** 🚨:
each product occupies his own line in ```.csv``` file(!) ⚠️. In order to provide photos for products we created **separate repo** 🦥 to store the photos, and in your products data we provide only links to the photos 📸.

Also in repo you can find ```SushiSushi menu.xlsx``` file 🍣. It contains exactly the same data as ```products.csv``` file, BUT it's much easier 🥵 to edit data in ```xlsx``` file, then in ```csv``` file 💀.

Everything in this file is already set upped for comfort editing of products 😊. If you want to edit products data: feel free to do it ✌️. You can change any data you want, just **make sure** it is suited for ```csv``` file 👌.

# How it works 🤔:
Each cell in product row is concatenated and separated with comma 😲. Then this concatenated rows are concatenated into one line in one cell at the bottom of the file 🤯.

Just copy paste the cell content into ```products.csv``` file. Make sure, that after copying the data - you separated each product into own line in ```.csv``` file 🦉, it's **critical point** 👮.

One more **critical point** - make sure that after ```copy/paste``` you left the ```header``` row at ```products.csv``` file 🫡.

That is all you need to know about editing the product data for our project! To know more you should deep dive 🤿 into commercetools docs, be observant 🔭, lucky 🍀 and ready to struggle 🫠.

# License 📜

This project is licensed under the MIT License 🥷.

# Acknowledgments 🙏

We want to thank [RS-School](https://rs.school/) community 🥰. <br>
And especially our mentor, [Andrej Podlubnyj](https://github.com/andron13) for his help and support ❤️.
