# wikitok

Tiktok for Wikipedia. Ripoff from [wikitok.net](https://wikitok.net/), inspired by [arxivtok](https://github.com/Miguel07Alm/arxivtok).

## Incentive

Why create the same thing that already exist? It gives me all the control I want as I have a lot of ideas that can make this into something that I would use daily as a medium to explore and learn new stuffs from Wikipedia itself. Let me link to [Wheel Reinventor's Principles](https://tobloef.com/blog/wheel-reinventors-principles/).

## Roadmap

- [ ] PWA
- [ ] Google Analytics
- [ ] Mobile responsive
- [ ] Social sharing
- [ ] Change layout dynamically
- [ ] Simple tests
- [ ] Performance improvement (Scrolling animation janky, unnecessary calls to fetch new page)
- [ ] Lighthouse test

## Running on Docker

Build the application into an image.

```
docker build . -t wikitok
```

Instantiate the image into a container and running it in the background.

```
docker run --name=wikitok -p 5000:80 -d wikitok
```

## Acknowledgements

Special thanks to the respective authors of wikitok and arxivtok for the inspiration, and more importantly the Wikipedia foundation, for providing such an easy-to-use API endpoint to retrieve random pages from Wikipedia.
