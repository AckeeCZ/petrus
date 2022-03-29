# Changelog

<a name="5.3.1"></a>

## 5.3.1 (2022-03-29)

### Fixed

-   🏷️ Fix some types issues found during usage at project [[72a24d5](https://github.com/AckeeCZ/petrus/commit/72a24d55d6dce2ed226445b8d34f1a7bae955b7c)]

<a name="5.3.0"></a>

## 5.3.0 (2022-03-14)

### Added

-   ✨ Make starting retrieveTokens saga conditional based on autoStartTokensRetrieval option [[9502ff0](https://github.com/AckeeCZ/petrus/commit/9502ff0e79104cfd637b5eb1081950d833544ac4)]

### Changed

-   🚚 Migrate to github actions from travis [[8fd2a89](https://github.com/AckeeCZ/petrus/commit/8fd2a89a7a01bf05fbb37aa458427c00e93c6af1)]

### Fixed

-   🐛 refreshing access token timeout - throw an error if upper limit is exceeded [[541eeda](https://github.com/AckeeCZ/petrus/commit/541eeda8f631dfb145b00e6633ed9525209d5597)]
-   💚 Fix test:ci script [[e24a0ac](https://github.com/AckeeCZ/petrus/commit/e24a0ac62fbeda8270e74583621013226769c29a)]

### Miscellaneous

-   🏷️ Fix type of getaccess token [[a0bbfbf](https://github.com/AckeeCZ/petrus/commit/a0bbfbf37ea00d9340dedab4d01f05eb8cd10bbb)]
-   Make logger optional in petrus.d.ts [[4060207](https://github.com/AckeeCZ/petrus/commit/4060207d4f0e667274bc1e784bed02178342cfc2)]
-   Make reducerKey optional in petrus.d.ts [[90aa273](https://github.com/AckeeCZ/petrus/commit/90aa273f1c09a1668a526fda102d8aa0d0e36f64)]
-   Make initialState optional in petrus.d.ts [[615cd4e](https://github.com/AckeeCZ/petrus/commit/615cd4eb5318452261f998cb9c6d37f95b9469f2)]
-   Make tokens optional in petrus.d.ts [[1387fc2](https://github.com/AckeeCZ/petrus/commit/1387fc23ac8addb531a8181691cc58db8edcaada)]
-   🏷️ Add types declaration file [[82d333f](https://github.com/AckeeCZ/petrus/commit/82d333f1f0e689feec228abe935809c001443bc8)]

<a name="5.2.4"></a>

## 5.2.4 (2022-01-18)

### Changed

-   🔧 Support react@17 in peerDependencies too [[623d016](https://github.com/AckeeCZ/petrus/commit/623d016eaf6f48edeef0515c5ff31d844a226574)]
-   ⬆️ @ackee/redux-utils@3.1.8 [[dc0a9d8](https://github.com/AckeeCZ/petrus/commit/dc0a9d896293f9684fda6c658fdf40751abea327)]
-   🚨 Fix correct Authenticated prop type [[b06d37d](https://github.com/AckeeCZ/petrus/commit/b06d37d00c495baf562b7bb63ea7af7d616f9471)]
-   ⬆️ Bump nth-check from 2.0.0 to 2.0.1 [[e4141d3](https://github.com/AckeeCZ/petrus/commit/e4141d3638d476f36ef01af3fec4360a9af28e0d)]
-   ⬆️ Bump tmpl from 1.0.4 to 1.0.5 [[6ec1c49](https://github.com/AckeeCZ/petrus/commit/6ec1c49ea1157c9c5aeaf502f8880a3b593eee15)]
-   ♻️ Use gitmoji-changelog from npx [[9daa6ad](https://github.com/AckeeCZ/petrus/commit/9daa6ad9435fb172472b8fc3bfe0a2d343f4f296)]
-   ⬆️ Bump path-parse from 1.0.6 to 1.0.7 [[ab23874](https://github.com/AckeeCZ/petrus/commit/ab238742959ca5f9d79bc2f56806deeb5c47cce9)]
-   ⬆️ Bump tar from 4.4.13 to 4.4.16 [[76a0a63](https://github.com/AckeeCZ/petrus/commit/76a0a63c3feddbd67a7f17135894eae63924ee2d)]
-   ⬆️ Bump hosted-git-info from 2.8.8 to 2.8.9 [[d957815](https://github.com/AckeeCZ/petrus/commit/d9578150b116facd6943d18b98d71f487481be90)]

### Miscellaneous

-   Bump ws from 6.2.1 to 6.2.2 [[2dec120](https://github.com/AckeeCZ/petrus/commit/2dec120f4fd341c9e3fe7fd420d9897cb6fce9e2)]
-   Bump browserslist from 4.12.0 to 4.16.6 [[18e7f94](https://github.com/AckeeCZ/petrus/commit/18e7f945643880ca5c6ca04d4fea9eba59d6dc0b)]
-   Bump ssri from 6.0.1 to 6.0.2 [[9390867](https://github.com/AckeeCZ/petrus/commit/93908672eb86597f777acd6b6bde152f43a19a40)]

<a name="5.2.2"></a>

## 5.2.2 (2021-08-10)

### Fixed

-   🐛 getAccessToken - refresh expired access token [[9dbf24b](https://github.com/AckeeCZ/petrus/commit/9dbf24bec28d9af04cd068e1f49ec0068a4c9e88)]

<a name="5.2.1"></a>

## 5.2.1 (2021-05-07)

### Fixed

-   🐛 Resolve getAccessToken when accessToken is avail. or on SET_TOKENS during tokens retrieval [[e1ca55b](https://github.com/AckeeCZ/petrus/commit/e1ca55bf0611c44bb475e9e3461d0f3a4b0dc1a5)]

<a name="5.2.0"></a>

## 5.2.0 (2021-03-22)

### Added

-   ✨ If authenticate handler doesn&#x27;t return a user, getAuthUser handler is called [[7a24320](https://github.com/AckeeCZ/petrus/commit/7a2432018dfb7b3fc783957e0668008524b1c75b)]

### Removed

-   🔥 Deprecate authorizable HOC in favor of Authenticated component [[9836166](https://github.com/AckeeCZ/petrus/commit/9836166f9b2b6d31a4a1b37c10994e90861274a7)]

### Fixed

-   🐛 Fix defininig session storage object [[e5011fa](https://github.com/AckeeCZ/petrus/commit/e5011fab02989dfe799dde81e694915ffdf435a1)]

<a name="5.1.1"></a>

## 5.1.1 (2021-03-17)

### Added

-   ✨ Add version and release npm scripts [[53c0b06](https://github.com/AckeeCZ/petrus/commit/53c0b06cf06002e984f8515906f79ae2fb4728c5)]

### Fixed

-   🐛 Fix checking sessionStorage availability [[4e2250f](https://github.com/AckeeCZ/petrus/commit/4e2250f3388d3ec69d1f0c86bd264fcf65375758)]

### Miscellaneous

-   Bump elliptic from 6.5.2 to 6.5.4 [[769bf75](https://github.com/AckeeCZ/petrus/commit/769bf7500307b0f688d8217b2d7f39df8d7ab828)]
-   Bump ini from 1.3.5 to 1.3.8 [[6364422](https://github.com/AckeeCZ/petrus/commit/6364422476751bc9ae00faa11452bf480d8b373f)]
-   Bump lodash from 4.17.15 to 4.17.21 [[56b5c64](https://github.com/AckeeCZ/petrus/commit/56b5c64177d4f1b64b777356a2db638a2084c428)]

<a name="5.1.0"></a>

## 5.1.0 (2021-03-03)

### Added

-   ✨ Add authenticated component [[7e39a26](https://github.com/AckeeCZ/petrus/commit/7e39a2684b310b1d7aeb5c37f596baf8bad7bd01)]

<a name="5.0.0"></a>

## 5.0.0 (2020-09-25)

### Changed

-   ♻️ Refactor handling thrown errors in sagas [[f3e6efa](https://github.com/AckeeCZ/petrus/commit/f3e6efa7fade09beb7a860c7b1bed1e34f1d9cb7)]
-   🔧 Increase version of nodejs at build env to 10 [[328c00a](https://github.com/AckeeCZ/petrus/commit/328c00ad5b15ea2d0136a56a21121a07b3c3a44c)]

<a name="4.0.6"></a>

## 4.0.6 (2020-06-17)

### Added

-   ➕ Add babel-plugin-module-resolver to fix aliases [[0962a72](https://github.com/AckeeCZ/petrus/commit/0962a72e940045c0593ecd0544046492494dcc50)]

### Fixed

-   🐛 Fix getAccessToken [[ebb3ceb](https://github.com/AckeeCZ/petrus/commit/ebb3ceb858d2444784c21001e028b67dfa6e4d2b)]

### Miscellaneous

-   4.0.6 [[b59e207](https://github.com/AckeeCZ/petrus/commit/b59e207ce08754738592c5abe336cdabfbc0754d)]
-   📝 Update changelog [[4d09426](https://github.com/AckeeCZ/petrus/commit/4d09426a3ae5e942423c178ef85219026285d42b)]

<a name="4.0.5"></a>

## 4.0.5 (2020-06-08)

### Changed

-   🔧 Remove release and version npm scripts [[eeaa486](https://github.com/AckeeCZ/petrus/commit/eeaa4867251b2b3f4b82045b81f373f367d23014)]
-   🔧 Add release and version npm scriptss [[0ac96aa](https://github.com/AckeeCZ/petrus/commit/0ac96aa2771631862bfa7896d6ee0a22727dc0b8)]
-   ♻️ Remove webpack aliases; use vscode aliases [[c7ac516](https://github.com/AckeeCZ/petrus/commit/c7ac5168b0fe445a67a043a0ccd09eca973a0ab7)]
-   ⬆️ Upgrade @ackee/redux-utils [[ad49512](https://github.com/AckeeCZ/petrus/commit/ad4951225dc5e638fb4d94d6ae0190bde1862ae4)]
-   ⬆️ Upgrade dependencies; add @ackee/browserslist-config [[b08bb65](https://github.com/AckeeCZ/petrus/commit/b08bb656c67347ab0d346e1e9330b4e00704cc61)]

### Miscellaneous

-   4.0.5 [[d32f1aa](https://github.com/AckeeCZ/petrus/commit/d32f1aae85bc530d11ae02578af3d5ae1fefdfa4)]
-   📝 Update changelog [[762d8a9](https://github.com/AckeeCZ/petrus/commit/762d8a94386f3a324b86586a345a1eb1aeb5bf6c)]
-   Merge pull request [#70](https://github.com/AckeeCZ/petrus/issues/70) from AckeeCZ/feature/browserslist [[e24f15d](https://github.com/AckeeCZ/petrus/commit/e24f15d40610d9dca9f9eaeee0b8956b10c5e2ab)]

<a name="4.0.4"></a>

## 4.0.4 (2020-05-25)

### Fixed

-   🐛 Fix opening connection to index db [[9d19f21](https://github.com/AckeeCZ/petrus/commit/9d19f21f452078ebbdcf3348e1ebf9ea6feb4309)]

### Miscellaneous

-   4.0.4 [[994bca1](https://github.com/AckeeCZ/petrus/commit/994bca193a3414372b4a6ed54c0694d5ec3f0931)]
-   📝 update changelog [[dbfed8d](https://github.com/AckeeCZ/petrus/commit/dbfed8d83ec69b3dc647c0810ce35069e3a13798)]
-   Merge pull request [#69](https://github.com/AckeeCZ/petrus/issues/69) from AckeeCZ/fix/indexedDB-connection [[fbffd12](https://github.com/AckeeCZ/petrus/commit/fbffd1285e0b31473a1afc0f4bbd6811cd79e1c2)]

<a name="4.0.3"></a>

## 4.0.3 (2020-05-22)

### Fixed

-   🐛 Fallback to storage mock when indexed db cannot been opened [[b41a170](https://github.com/AckeeCZ/petrus/commit/b41a17010fd91927f70189f3747b6f8e7045501c)]

### Miscellaneous

-   4.0.3 [[10a90a0](https://github.com/AckeeCZ/petrus/commit/10a90a0566700c1e4fd6792c6da0d5971d4508ad)]
-   📝 Update changelog [[f5616a8](https://github.com/AckeeCZ/petrus/commit/f5616a8b4aa07b1bf01a6d3fb6663b75a57a38d3)]
-   Merge pull request [#68](https://github.com/AckeeCZ/petrus/issues/68) from AckeeCZ/fix/working-in-private-browser-mode [[39fc174](https://github.com/AckeeCZ/petrus/commit/39fc174665f685aa13cc9d50dc6128d8139c3d6e)]

<a name="4.0.2"></a>

## 4.0.2 (2020-04-21)

### Fixed

-   🐛 Set checkTokenExpirationOnTabFocus to true by default [[ae8bd67](https://github.com/AckeeCZ/petrus/commit/ae8bd67f0b58f5897b9f0bbf9f69a3feb8b20ba3)]

### Miscellaneous

-   4.0.2 [[1151475](https://github.com/AckeeCZ/petrus/commit/1151475fca50310c5a9ae1f7b86d30223ef4d853)]

<a name="4.0.1"></a>

## 4.0.1 (2020-04-03)

### Changed

-   🔧 Add version and release scripts to package.json [[c09c11f](https://github.com/AckeeCZ/petrus/commit/c09c11f2650bd472da0152da98107ddde68e9fd5)]

### Fixed

-   🚑 Remove .gitignore from .npmingnore [[dc95445](https://github.com/AckeeCZ/petrus/commit/dc95445eb1d2bf207b70c25f636b333d2aa15d93)]

### Miscellaneous

-   v4.0.1 [[e5bccdb](https://github.com/AckeeCZ/petrus/commit/e5bccdb243b12e79b17df8d9e4a10166164b7a55)]
-   Update package.json [[8187e26](https://github.com/AckeeCZ/petrus/commit/8187e26ce00243b2bde07135e87f16139d6ba35a)]
-   Update changelog [[ced93fe](https://github.com/AckeeCZ/petrus/commit/ced93fe34e7601ec41f1e1f8a8535c0aaaf37ac2)]
-   Upgrade to @ackee/eslint-config@2.0.0 [[8e17e69](https://github.com/AckeeCZ/petrus/commit/8e17e695898a82795bc9444776d082f9fe05f112)]
-   4.0.0 [[189fa37](https://github.com/AckeeCZ/petrus/commit/189fa3776b541e0e4465dfc8505387e1163f50e1)]
-   Add storage handler for tokens persistence NONE [[88a66ba](https://github.com/AckeeCZ/petrus/commit/88a66ba23ae3275e255b216ea1256802901bedc3)]
-   Merge pull request [#63](https://github.com/AckeeCZ/petrus/issues/63) from AckeeCZ/jstorm31-patch-1 [[f6ebab0](https://github.com/AckeeCZ/petrus/commit/f6ebab028d0e02549d91c5b278cf4a8dabcdf1ff)]
-   fix documentation return type [[3c90e2d](https://github.com/AckeeCZ/petrus/commit/3c90e2d40f322d800a717849be7e0706791d3095)]

<a name="4.0.0-beta.20"></a>

## 4.0.0-beta.20 (2019-12-05)

### Miscellaneous

-   4.0.0-beta.20 [[48fc974](https://github.com/AckeeCZ/petrus/commit/48fc97491d05ad5607cfb1e240d18a030dc8ea5f)]
-   Clear storage state if tokens retrieval fails [[32b7dc4](https://github.com/AckeeCZ/petrus/commit/32b7dc441cce199948a9e624f16ed87d3ef2ba88)]
-   RETRIEVE_TOKENS_RESOLVE is dispatched after fetchUser saga ends [[c39894a](https://github.com/AckeeCZ/petrus/commit/c39894a328201da8dc7fa8808a849064f711896c)]
-   Map authorizable HOC state on current flowType [[5b5aad5](https://github.com/AckeeCZ/petrus/commit/5b5aad551a678bb646f1b2cd5689c8d14eea5a61)]
-   Remove browserslist [[5ddc9a5](https://github.com/AckeeCZ/petrus/commit/5ddc9a5ae572dfba9d752c3f9fedc9164df11305)]

<a name="4.0.0-beta.19"></a>

## 4.0.0-beta.19 (2019-11-15)

### Miscellaneous

-   4.0.0-beta.19 [[358418b](https://github.com/AckeeCZ/petrus/commit/358418bbaaf6e7e13dea0ef59208c184f679bbb1)]
-   Update babel config - use @babel/preset-modules [[46cb709](https://github.com/AckeeCZ/petrus/commit/46cb70972ea691acea723f7f91c40835da261f97)]
-   Upgrade dependencies [[4532604](https://github.com/AckeeCZ/petrus/commit/453260432632d2069807597fbb98e7fcc2b9e41a)]

<a name="4.0.0-beta.18"></a>

## 4.0.0-beta.18 (2019-10-17)

### Added

-   ✨ OAuth: add processTokens method [[23b918f](https://github.com/AckeeCZ/petrus/commit/23b918f6fea86dd841f6a3df666b941ea00b43e5)]

### Miscellaneous

-   4.0.0-beta.18 [[0eceeb8](https://github.com/AckeeCZ/petrus/commit/0eceeb8bf1bd32d17d1c75049e35d73ec3f2bbb8)]

<a name="4.0.0-beta.17"></a>

## 4.0.0-beta.17 (2019-10-17)

### Fixed

-   🐛 oAuth: if accessToken, tokens will be null, therefore not retrieved [[f6c1a20](https://github.com/AckeeCZ/petrus/commit/f6c1a2008c9d6a763b903ff842bf90a0b27fea89)]
-   🐛 Fix getSearchParams [[23ba469](https://github.com/AckeeCZ/petrus/commit/23ba4696b694c430a6df3b4d85dc1b32fa34bb2b)]

### Miscellaneous

-   4.0.0-beta.17 [[a279c95](https://github.com/AckeeCZ/petrus/commit/a279c95f8d4dea242da342b5d299df374e802b59)]
-   Merge pull request [#58](https://github.com/AckeeCZ/petrus/issues/58) from AckeeCZ/bugfix/OAuth [[361f9a1](https://github.com/AckeeCZ/petrus/commit/361f9a106e7023d63373addea7e255a99c62ecb2)]
-   📝 Update changelog [[ccfe83b](https://github.com/AckeeCZ/petrus/commit/ccfe83bffef649d009e15737107a751114ec2f5c)]
-   Update changelog [[60f5061](https://github.com/AckeeCZ/petrus/commit/60f506155b97956a830c844e2052da0db369f4b9)]

<a name="4.0.0-beta.16"></a>

## 4.0.0-beta.16 (2019-10-16)

### Fixed

-   🐛 Fix OAuth init [[c6ea722](https://github.com/AckeeCZ/petrus/commit/c6ea722daa16cfead17d5d936c40b0287252e328)]

### Miscellaneous

-   4.0.0-beta.16 [[0023d9c](https://github.com/AckeeCZ/petrus/commit/0023d9c9e1f6aca506c9103f2fdd16d6cd8da607)]

<a name="4.0.0-beta.15"></a>

## 4.0.0-beta.15 (2019-10-15)

### Added

-   ✨ Add flowType [[fd7b805](https://github.com/AckeeCZ/petrus/commit/fd7b8056c3e33229e29f07653f0251b0078cf357)]

### Changed

-   ⬆️ Update dependencies [[071d210](https://github.com/AckeeCZ/petrus/commit/071d2100158ebe190ab0cd12a2cff0c32cf4661f)]
-   ⬆️ Upgrade @ackee/redux-utils [[6514b3d](https://github.com/AckeeCZ/petrus/commit/6514b3d230d305275d516f0ccd8cb6ded63e6d69)]

### Miscellaneous

-   4.0.0-beta.15 [[984d3e6](https://github.com/AckeeCZ/petrus/commit/984d3e6d307894bed7b3b6cef2665cf4df2073a5)]
-   Merge pull request [#56](https://github.com/AckeeCZ/petrus/issues/56) from AckeeCZ/feature/flow-type [[4b80d9f](https://github.com/AckeeCZ/petrus/commit/4b80d9f59ebd0c1f0496979f8a1819741b58ffd6)]
-   📝 Update changelog [[a37c17a](https://github.com/AckeeCZ/petrus/commit/a37c17a50320035c65c0926140e561d064b37030)]
-   📝 Add docs for FlowType [[25a1ef4](https://github.com/AckeeCZ/petrus/commit/25a1ef41a6edcfb30b487ce3e85a1be6318bd5e7)]

<a name="4.0.0-beta.14"></a>

## 4.0.0-beta.14 (2019-10-11)

### Fixed

-   🐛 Fix getAccessToken [[1f57e0a](https://github.com/AckeeCZ/petrus/commit/1f57e0ae02f3445dddbee7a94c6844a3e3cb8fa2)]

### Miscellaneous

-   4.0.0-beta.14 [[d896361](https://github.com/AckeeCZ/petrus/commit/d89636190093c22b8cde02b1d91ad4d20d54ea1a)]
-   Merge pull request [#51](https://github.com/AckeeCZ/petrus/issues/51) from AckeeCZ/fix/getAccessToken [[516fcac](https://github.com/AckeeCZ/petrus/commit/516fcacf601122163dbe3ad8ab3e0d05ad7f05fc)]
-   Fix snippet syntax error in docs [[26d50d0](https://github.com/AckeeCZ/petrus/commit/26d50d01800593b979f48759fae8b3a1b0cbf1d3)]

<a name="4.0.0-beta.13"></a>

## 4.0.0-beta.13 (2019-10-11)

### Miscellaneous

-   4.0.0-beta.13 [[96269f8](https://github.com/AckeeCZ/petrus/commit/96269f806de9b03ab2c7c6cf3b15ad4e4500ee3f)]
-   Merge pull request [#50](https://github.com/AckeeCZ/petrus/issues/50) from AckeeCZ/feature/get-auth-token [[46a33a6](https://github.com/AckeeCZ/petrus/commit/46a33a69bb001bf0c07ef7db0571dc8d31e5ebd9)]
-   Export SessionState instead of AuthSession [[5ce1092](https://github.com/AckeeCZ/petrus/commit/5ce1092cde5093f9e2492aefb6f19781fe2af603)]
-   Add getAccessToken util [[bccbd59](https://github.com/AckeeCZ/petrus/commit/bccbd59aaca2dfc41841b9de481f919c26eba5d1)]
-   Document SessionState enum [[a5a5407](https://github.com/AckeeCZ/petrus/commit/a5a5407db407d52ce52a2162d57a6da24e4a73ed)]
-   Update docs [[14def13](https://github.com/AckeeCZ/petrus/commit/14def1314adcaf29ddfaec1cd1d0ad5a259c8696)]

<a name="4.0.0-beta.12"></a>

## 4.0.0-beta.12 (2019-08-08)

### Miscellaneous

-   4.0.0-beta.12 [[5926ac8](https://github.com/AckeeCZ/petrus/commit/5926ac828ee16a2b7085a3a41be6c72fd60d2e94)]
-   Update changelog [[c02b998](https://github.com/AckeeCZ/petrus/commit/c02b998f091d6728fb79b2dea91a1a8bd511a67b)]
-   Upgrade @ackee/redux-utils [[7ae48f3](https://github.com/AckeeCZ/petrus/commit/7ae48f3622236f75ea8f82bbc40858bf5ba054e3)]
-   Fix apiSelector selector [[aaec8e2](https://github.com/AckeeCZ/petrus/commit/aaec8e24c27aa1554596284fef73bd0a144f055c)]

<a name="4.0.0-beta.11"></a>

## 4.0.0-beta.11 (2019-08-01)

### Miscellaneous

-   4.0.0-beta.11 [[d068891](https://github.com/AckeeCZ/petrus/commit/d068891f463a865910570840d39b6cb880163f79)]
-   Merge pull request [#45](https://github.com/AckeeCZ/petrus/issues/45) from AckeeCZ/feature/terminate [[462522b](https://github.com/AckeeCZ/petrus/commit/462522b739e88820acd63a2725ed5741a5e42fae)]
-   Remove raceWithTerminate from documentVisibility [[e974f0b](https://github.com/AckeeCZ/petrus/commit/e974f0bad6da1165251e69f68eac8f61846716bf)]
-   Add terminate action [[207c526](https://github.com/AckeeCZ/petrus/commit/207c5262b80f398f2f9bd9860b82bdde5e98d813)]

<a name="4.0.0-beta.10"></a>

## 4.0.0-beta.10 (2019-07-29)

### Miscellaneous

-   4.0.0-beta.10 [[4e43779](https://github.com/AckeeCZ/petrus/commit/4e43779fe121619b29c74422bfa352f32c8f1cf9)]
-   Update changelog [[cecdf78](https://github.com/AckeeCZ/petrus/commit/cecdf78acacce6a71a8f5b6fb26cc3c3eaaef292)]
-   tokens/storage: fix deleteTokens saga [[016c60c](https://github.com/AckeeCZ/petrus/commit/016c60c5f0fdb337e0ed4c13f1251ba6737c7398)]

<a name="4.0.0-beta.9"></a>

## 4.0.0-beta.9 (2019-07-29)

### Miscellaneous

-   4.0.0-beta.9 [[e21a946](https://github.com/AckeeCZ/petrus/commit/e21a946e9b454f959f94e95a7d5834c1e935ef5b)]
-   Update changelog [[dda69de](https://github.com/AckeeCZ/petrus/commit/dda69deefa27401a650b239b2885fdad2bfc3ed8)]
-   Merge pull request [#43](https://github.com/AckeeCZ/petrus/issues/43) from AckeeCZ/hotfix/globalEnv [[5f9b87d](https://github.com/AckeeCZ/petrus/commit/5f9b87da8fd3d82224e3c8f23ae89b20f8836062)]
-   Fix setting global env. var. [[f26f7b6](https://github.com/AckeeCZ/petrus/commit/f26f7b6deded86cb7e85e9cb362f7696dc16cbd5)]

<a name="4.0.0-beta.8"></a>

## 4.0.0-beta.8 (2019-07-26)

### Miscellaneous

-   4.0.0-beta.8 [[2f1cd91](https://github.com/AckeeCZ/petrus/commit/2f1cd915526ab097188ab8456d878c9b1aa4ea6c)]
-   Update changelog [[4d6f08a](https://github.com/AckeeCZ/petrus/commit/4d6f08a4e64842ca19d9cb23cdb24717f29e032e)]
-   CR fixes [[97d79f4](https://github.com/AckeeCZ/petrus/commit/97d79f423497db4561056ae530da5c3f92f80934)]
-   Fix docs links [[70a804a](https://github.com/AckeeCZ/petrus/commit/70a804a74f0c5ac8d5b2cd320ed83964742d44c1)]

<a name="4.0.0-beta.7"></a>

## 4.0.0-beta.7 (2019-07-26)

### Miscellaneous

-   4.0.0-beta.7 [[9cc8af7](https://github.com/AckeeCZ/petrus/commit/9cc8af7b4f46b326d7cefc977f296c906a10be79)]
-   Update changelog [[8b8bb19](https://github.com/AckeeCZ/petrus/commit/8b8bb1921cfb339ab0ef1b74f20091e730b96b75)]
-   Merge pull request [#42](https://github.com/AckeeCZ/petrus/issues/42) from AckeeCZ/feature/storage-driver [[0fea418](https://github.com/AckeeCZ/petrus/commit/0fea418c9f18c225877fcc5c29af1cea848e1d50)]
-   Fix links between doc files [[4b0721e](https://github.com/AckeeCZ/petrus/commit/4b0721e74c5799b7c17663754f568c00e888f71e)]
-   Update docs [[f24e9c3](https://github.com/AckeeCZ/petrus/commit/f24e9c397500b8766d9bcdb01b12c3b92a91c7b0)]
-   Add docs for storager drivers [[3d4b505](https://github.com/AckeeCZ/petrus/commit/3d4b5050ccf8343a466606fe8f4c56d33e393287)]
-   Make storage drivers (for each tokens persistence) configurable [[6aae688](https://github.com/AckeeCZ/petrus/commit/6aae688cfa0189dded45436840e101fb5b3b6127)]
-   Update changelog [[2053e19](https://github.com/AckeeCZ/petrus/commit/2053e1927f1121860e42389992a22916b3272de3)]

<a name="4.0.0-beta.6"></a>

## 4.0.0-beta.6 (2019-07-25)

### Miscellaneous

-   4.0.0-beta.6 [[e68d7c6](https://github.com/AckeeCZ/petrus/commit/e68d7c69769bd34f549157b74a1b817ddc048a9f)]
-   Add missing mock for indexedDB [[dc5707f](https://github.com/AckeeCZ/petrus/commit/dc5707fda79487d3791fd7b01f0b42ec7cc146e9)]

<a name="4.0.0-beta.5"></a>

## 4.0.0-beta.5 (2019-07-16)

### Miscellaneous

-   4.0.0-beta.5 [[dd1cbb2](https://github.com/AckeeCZ/petrus/commit/dd1cbb24066db30f80898a20484623768b4217ae)]
-   Fix refresh tokens saga [[9f6c90d](https://github.com/AckeeCZ/petrus/commit/9f6c90d11445d2df81ee07e2d682f103fa2a0c1c)]

<a name="4.0.0-beta.4"></a>

## 4.0.0-beta.4 (2019-07-15)

### Miscellaneous

-   4.0.0-beta.4 [[b3e3eaa](https://github.com/AckeeCZ/petrus/commit/b3e3eaaee1f4ec549689333978b9318458da88f4)]
-   Fix refresh tokens saga [[10844e7](https://github.com/AckeeCZ/petrus/commit/10844e79f230e9960b1a9eb61044ee5226ebb822)]

<a name="4.0.0-beta.3"></a>

## 4.0.0-beta.3 (2019-07-15)

### Miscellaneous

-   4.0.0-beta.3 [[0c6f825](https://github.com/AckeeCZ/petrus/commit/0c6f825b44854911d38f8e8ddf091d2c67fb1c92)]
-   Update changelog [[a7eb55a](https://github.com/AckeeCZ/petrus/commit/a7eb55ab265593bdbd464a522ff14dbe7c626a4a)]
-   Merge pull request [#41](https://github.com/AckeeCZ/petrus/issues/41) from AckeeCZ/hotfix/refresh-tokens [[4d88f95](https://github.com/AckeeCZ/petrus/commit/4d88f95f27d042665c7deca63a342d03c6b1ef09)]
-   tokens/refreshment: pass refreshed tokens to applyAccessTokenExternally instead of the old ones [[2b5f635](https://github.com/AckeeCZ/petrus/commit/2b5f6359fbd136e6fa38e858a236158f3c315e7b)]

<a name="4.0.0-beta.2"></a>

## 4.0.0-beta.2 (2019-06-28)

### Miscellaneous

-   4.0.0-beta.2 [[b66a82a](https://github.com/AckeeCZ/petrus/commit/b66a82a8c507986dfee8aec07b112a3862268bae)]
-   Update changelog [[40a345c](https://github.com/AckeeCZ/petrus/commit/40a345c185c97447453348c4b4cee169cde4c408)]
-   Merge pull request [#39](https://github.com/AckeeCZ/petrus/issues/39) from AckeeCZ/feature/apply-access-token-externally [[933ef1a](https://github.com/AckeeCZ/petrus/commit/933ef1a53894f57e41b86c1511b31d15d5a4f623)]
-   Update changelog and docs [[f01c058](https://github.com/AckeeCZ/petrus/commit/f01c058ae1d6e75fc6d6a59a1bb6bf8af4c9be00)]
-   Update babel config [[8741228](https://github.com/AckeeCZ/petrus/commit/8741228be406adf606470c09a64a951609c4b28d)]
-   Fix circular dep. [[f959618](https://github.com/AckeeCZ/petrus/commit/f959618c5a40f178d3d29f6dc5631dad6de3ac12)]
-   Implement applyAccessTokenExternally feature [[6f8432c](https://github.com/AckeeCZ/petrus/commit/6f8432c64de0fbe8123c2e90a3e65e8edc0d66f8)]

<a name="4.0.0-beta.1"></a>

## 4.0.0-beta.1 (2019-06-24)

### Miscellaneous

-   4.0.0-beta.1 [[f2ea232](https://github.com/AckeeCZ/petrus/commit/f2ea23219ab7325273033b082968fc4feb7c5092)]
-   Merge pull request [#38](https://github.com/AckeeCZ/petrus/issues/38) from AckeeCZ/feature/upgrade-dependencies [[b74d726](https://github.com/AckeeCZ/petrus/commit/b74d726fb24a48550149030fb0d4df4bfd5a5264)]
-   Upgrade dependencies [[e317741](https://github.com/AckeeCZ/petrus/commit/e317741cb825446fab0308803f23bd14b3aeca8e)]

<a name="4.0.0-beta.0"></a>

## 4.0.0-beta.0 (2019-05-28)

### Miscellaneous

-   4.0.0-beta.0 [[f70e6bd](https://github.com/AckeeCZ/petrus/commit/f70e6bde04bbaead1242c0053246f9951aae0ad2)]
-   Merge pull request [#36](https://github.com/AckeeCZ/petrus/issues/36) from AckeeCZ/feature/structure [[dc05e13](https://github.com/AckeeCZ/petrus/commit/dc05e13ced0781a14e0dcae42b88b91418abc3be)]
-   docs/api: fix selectors [[6332cf7](https://github.com/AckeeCZ/petrus/commit/6332cf739c8c89dfac41829cbe81648de5bf611e)]
-   Update changelog [[2ed5cee](https://github.com/AckeeCZ/petrus/commit/2ed5cee758a760f7fd40368c957e8485833111ab)]
-   Update changelog [[c7db762](https://github.com/AckeeCZ/petrus/commit/c7db762c719b5147e831d85aa38a13ddd0da1fce)]
-   Update docs [[455b290](https://github.com/AckeeCZ/petrus/commit/455b290a6e556052d1ad2213b4353e20116130a9)]
-   Upgrade redux-saga to version 1.0.x [[bbbdf90](https://github.com/AckeeCZ/petrus/commit/bbbdf90b14f0356c6c65ee8e437b2fba6311dec1)]

<a name="4.0.0-alpha.2"></a>

## 4.0.0-alpha.2 (2019-05-04)

### Miscellaneous

-   4.0.0-alpha.2 [[d533587](https://github.com/AckeeCZ/petrus/commit/d533587efedc6915b5eed1e6b20a63bf9d02c6a9)]
-   Upgrade @ackee/redux-utils; add sideEffects flag [[2f3272e](https://github.com/AckeeCZ/petrus/commit/2f3272e00c36c6ba31072898bc0d6f88e2d00190)]
-   Eliminate lodash functions completely [[27fed9c](https://github.com/AckeeCZ/petrus/commit/27fed9c942369c513ca2371d4b65629e2e5eee2e)]

<a name="4.0.0-alpha.1"></a>

## 4.0.0-alpha.1 (2019-05-01)

### Miscellaneous

-   4.0.0-alpha.1 [[00091de](https://github.com/AckeeCZ/petrus/commit/00091debf77d1290bdfc9592aebd795900c3486b)]
-   Try to eliminate lodash functions [[95b1ed6](https://github.com/AckeeCZ/petrus/commit/95b1ed60d179e3fc165cd3ceabc0e686f878d9e5)]

<a name="4.0.0-alpha.0"></a>

## 4.0.0-alpha.0 (2019-05-01)

### Miscellaneous

-   4.0.0-alpha.0 [[ac043af](https://github.com/AckeeCZ/petrus/commit/ac043af07d9ea20e8d6d62ae1b3c8d3e185a93d7)]
-   Fix bugs after refactoring [[09a4c9d](https://github.com/AckeeCZ/petrus/commit/09a4c9dd2c9aaa710faa4f68bcb4ff4b49299b36)]
-   Remove yarn test from pre-push hook (only temporally) [[c3b0065](https://github.com/AckeeCZ/petrus/commit/c3b006533e9189d0182f1682b447ac4b0734f2be)]
-   Update jest config [[7fddcd9](https://github.com/AckeeCZ/petrus/commit/7fddcd9e01b55aa2e5883aa7ab3a102283cc99ae)]
-   Complete package refactor and architecture redesign [[9729ae5](https://github.com/AckeeCZ/petrus/commit/9729ae59283d4e44119be6bc3fdfe184b0bd8e06)]
-   Add webpack aliases [[62b68ab](https://github.com/AckeeCZ/petrus/commit/62b68abafb8cb3dfc52de8c1d0c8165310d0a29d)]
-   Add jest [[c37cd67](https://github.com/AckeeCZ/petrus/commit/c37cd67526399d9c41d946a36e97dd0e41a61f6f)]
-   Add global services [[7370729](https://github.com/AckeeCZ/petrus/commit/73707296dbacb25de11c6b122aff3dec8628ac81)]
-   Add npm script for analyzing bundle size [[79ea3a3](https://github.com/AckeeCZ/petrus/commit/79ea3a31c4316b3f387c1df68fc197c752355af4)]

<a name="3.7.11"></a>

## 3.7.11 (2019-04-25)

### Miscellaneous

-   3.7.11 [[bded117](https://github.com/AckeeCZ/petrus/commit/bded1176ee24cd836bb58eb41c67e1b1421556fb)]
-   Add babel-plugin-transform-imports plugin [[e134217](https://github.com/AckeeCZ/petrus/commit/e134217c0afc7bddecb8f45152446ef3ac157443)]

<a name="3.7.10"></a>

## 3.7.10 (2019-04-20)

### Miscellaneous

-   v3.7.10 [[4becf08](https://github.com/AckeeCZ/petrus/commit/4becf086d68d78de940ea98a4f6e1e2ef23f0d76)]

<a name="3.7.9"></a>

## 3.7.9 (2019-04-20)

### Miscellaneous

-   v3.7.9 [[f90a98a](https://github.com/AckeeCZ/petrus/commit/f90a98acf2ed11744d75869b998c3220e8209a03)]

<a name="3.7.8"></a>

## 3.7.8 (2019-04-20)

### Miscellaneous

-   v3.7.8 [[0fd0047](https://github.com/AckeeCZ/petrus/commit/0fd00474f5a0f63483768307bd36405ab40f7575)]

<a name="3.7.7"></a>

## 3.7.7 (2019-04-20)

### Miscellaneous

-   3.7.7 [[1a74094](https://github.com/AckeeCZ/petrus/commit/1a74094023802d29de1290aa50c5b0e25cbbfdcb)]

<a name="3.7.6"></a>

## 3.7.6 (2019-04-20)

### Miscellaneous

-   3.7.6 [[a259c85](https://github.com/AckeeCZ/petrus/commit/a259c8592f5c0b8c145db129bb19239a2848384c)]
-   Upgrade dependencies [[d4f5c83](https://github.com/AckeeCZ/petrus/commit/d4f5c837cc90b6a493dd09e655b892a553a90d74)]

<a name="3.7.5"></a>

## 3.7.5 (2019-04-19)

### Miscellaneous

-   3.7.5 [[84167e1](https://github.com/AckeeCZ/petrus/commit/84167e11ba2c6fb2bed259dbfd209d86d272d395)]
-   Update readme [[3e60351](https://github.com/AckeeCZ/petrus/commit/3e6035161fae4f6be6c95dc6dd5607715d35cdda)]

<a name="3.7.4"></a>

## 3.7.4 (2019-04-19)

### Miscellaneous

-   3.7.4 [[09e75b3](https://github.com/AckeeCZ/petrus/commit/09e75b3e57337827e244c22bf2fb85828db55523)]

<a name="3.7.3"></a>

## 3.7.3 (2019-04-19)

### Miscellaneous

-   3.7.3 [[fb8de03](https://github.com/AckeeCZ/petrus/commit/fb8de03d4cb3fcaf007b69127a38acb207903621)]
-   Remove localforage, use custom key-value methods built with idb (lightweight wrapper for IndexedDB) [[ba42631](https://github.com/AckeeCZ/petrus/commit/ba42631aa12e3a1b6af1f91dd33c1f905eb5b6a2)]

<a name="3.7.2"></a>

## 3.7.2 (2019-04-19)

### Miscellaneous

-   3.7.2 [[35ddf10](https://github.com/AckeeCZ/petrus/commit/35ddf10c96a981f8b272125991b60c7ee5bd3e26)]
-   Move lodash with localforage back to dependencies; try to use direct imports for lodash [[5cc6662](https://github.com/AckeeCZ/petrus/commit/5cc6662227ea1381bb07da61dfb4b246900dc44f)]

<a name="3.7.1"></a>

## 3.7.1 (2019-04-19)

### Miscellaneous

-   3.7.1 [[5f3dd22](https://github.com/AckeeCZ/petrus/commit/5f3dd2222c2293a5be90420ba52fc6f4841e80e6)]
-   Move localforage and lodash among peer dependencies [[ce56871](https://github.com/AckeeCZ/petrus/commit/ce56871b222201f7d462a8a4c8a4ed099b55af53)]

<a name="3.7.0"></a>

## 3.7.0 (2019-04-13)

### Miscellaneous

-   3.7.0 [[de88f42](https://github.com/AckeeCZ/petrus/commit/de88f425d66670b1d185095db37c1407ede264ef)]
-   Merge pull request [#35](https://github.com/AckeeCZ/petrus/issues/35) from AckeeCZ/feature/verify-access-token-availability [[7644a6a](https://github.com/AckeeCZ/petrus/commit/7644a6a48f316d08dbe069ac4a7c41a49ef7a9bc)]
-   Add verifyAccessTokenAvailability action creator [[fb488c8](https://github.com/AckeeCZ/petrus/commit/fb488c85344c0eaf47730f50c901f5dee8e14d7d)]

<a name="3.6.0"></a>

## 3.6.0 (2019-04-13)

### Miscellaneous

-   3.6.0 [[942f6eb](https://github.com/AckeeCZ/petrus/commit/942f6eb6621dd00cee1b2ffc07466729b0fea88d)]
-   Update changelog [[f78ea42](https://github.com/AckeeCZ/petrus/commit/f78ea4277fd5a90e48b5dd417f7964f0b3ca15ad)]
-   Merge pull request [#34](https://github.com/AckeeCZ/petrus/issues/34) from AckeeCZ/feature/external-logger-and-on-error [[041d802](https://github.com/AckeeCZ/petrus/commit/041d8029985ec080ceac281829bd1ab96130f1f0)]
-   Merge pull request [#33](https://github.com/AckeeCZ/petrus/issues/33) from AckeeCZ/feature/document-visibility [[affce38](https://github.com/AckeeCZ/petrus/commit/affce3870d8968b1be6d1a7b533d5cc30f9e91c5)]
-   Update changelog and readme [[6eeaa3f](https://github.com/AckeeCZ/petrus/commit/6eeaa3fc908f0dba7a6507254580cf14bf3b501f)]
-   Upgrade dependencies [[907f619](https://github.com/AckeeCZ/petrus/commit/907f619851c988c51754bf8995f3f58626c865d9)]
-   Support external logger object [[da75305](https://github.com/AckeeCZ/petrus/commit/da753057d0d4fbdf67a8a4f355355adfaf907af5)]
-   Check token expiration on tab focus [[285d2b6](https://github.com/AckeeCZ/petrus/commit/285d2b6d3e2623f70b739d03d9b34152fe5c934c)]

<a name="3.5.2"></a>

## 3.5.2 (2019-03-16)

### Miscellaneous

-   3.5.2 [[2394296](https://github.com/AckeeCZ/petrus/commit/239429637e3ea111fc0c40ca6beeda9c37042edb)]
-   Merge pull request [#31](https://github.com/AckeeCZ/petrus/issues/31) from AckeeCZ/bugfix/tokens-retrieval [[6cd9739](https://github.com/AckeeCZ/petrus/commit/6cd9739d724345e616c9809b7485866bac49cc7e)]
-   Update changelog [[df2097c](https://github.com/AckeeCZ/petrus/commit/df2097c2e0637e12e22dde7bc1b71c04ed631f7a)]
-   If retrieved tokens are expired, refresh tokens, wait for the refresh request to finish and then fetch auth. user [[30fdb29](https://github.com/AckeeCZ/petrus/commit/30fdb2922c7492461ccd0161d8dfce013002c5b8)]

<a name="3.5.1"></a>

## 3.5.1 (2019-03-05)

### Miscellaneous

-   3.5.1 [[59b8ed6](https://github.com/AckeeCZ/petrus/commit/59b8ed62cd1828566eb48fc3cbcfbd6fd1125814)]
-   Merge pull request [#28](https://github.com/AckeeCZ/petrus/issues/28) from AckeeCZ/feature/auth-content [[e1fbe8d](https://github.com/AckeeCZ/petrus/commit/e1fbe8d163751a601f418509bbda5eff584bd14e)]
-   Update changelog [[4fa32ec](https://github.com/AckeeCZ/petrus/commit/4fa32ec96badd0d3e405f2aab2a872dd067703d8)]
-   Render authorized content only if tokens and auth. user is available in the store [[315a8f0](https://github.com/AckeeCZ/petrus/commit/315a8f0a2a7b81309c5868e2c5633b483f542b09)]
-   Dispatch setTokens before stopLogin [[3d7c796](https://github.com/AckeeCZ/petrus/commit/3d7c796ba54e2533361ae214be1579bb7cf62376)]
-   Fix type in changelog [[baca023](https://github.com/AckeeCZ/petrus/commit/baca023ee7d0efa9d88babdfd73be1fa68289e98)]

<a name="3.5.0"></a>

## 3.5.0 (2019-02-22)

### Miscellaneous

-   3.5.0 [[3ee5eca](https://github.com/AckeeCZ/petrus/commit/3ee5ecabfc860dbf6cb2091018f008bd92566c86)]
-   Update changelog [[81f0f6d](https://github.com/AckeeCZ/petrus/commit/81f0f6d361701bef567346b952fc1627d1ff79cd)]
-   Merge pull request [#27](https://github.com/AckeeCZ/petrus/issues/27) from AckeeCZ/feature-support-ssr [[c808553](https://github.com/AckeeCZ/petrus/commit/c808553efb4407bf0bcf43a58e17ee3d0fd6136a)]
-   Fix lint errors [[8aebbee](https://github.com/AckeeCZ/petrus/commit/8aebbee2c9e8025fce31dc0af61e9c0838750b28)]
-   Change handling of server side case in getOAuthTokens [[edcd69a](https://github.com/AckeeCZ/petrus/commit/edcd69aeff72730ae4a6058e314d2f4845dc33f1)]
-   Fix using timeout methods at server side [[f64d54c](https://github.com/AckeeCZ/petrus/commit/f64d54ccb1129a256f19c9fed485cea50cb37f31)]
-   Fix using getOAuthTokes at server side [[c287d8e](https://github.com/AckeeCZ/petrus/commit/c287d8ec0c3c29329b01b50487c00eae8fc356f2)]
-   Add mocks for local and session storage when used at server side [[fe92799](https://github.com/AckeeCZ/petrus/commit/fe92799eaf105aeadd5a1a3bae55732ce8f50ad3)]

<a name="3.4.1"></a>

## 3.4.1 (2019-02-20)

### Miscellaneous

-   3.4.1 [[15a6eb7](https://github.com/AckeeCZ/petrus/commit/15a6eb7917b5a43df88d999ada018eee558a6b4c)]
-   Add missing export of the createExpirationDate util. [[4438841](https://github.com/AckeeCZ/petrus/commit/44388412ab3b85e09fe1eefa7f8af499dcd470f1)]

<a name="3.4.0"></a>

## 3.4.0 (2019-02-20)

### Miscellaneous

-   3.4.0 [[343e598](https://github.com/AckeeCZ/petrus/commit/343e598910d48934778fcccf4c66628f91096deb)]
-   Merge pull request [#24](https://github.com/AckeeCZ/petrus/issues/24) from AckeeCZ/bugfix/OAuth-retrive-tokens [[d016f03](https://github.com/AckeeCZ/petrus/commit/d016f03f515d64afe766286097a25ff7c0939c41)]
-   Use isNil from lodash [[29099a3](https://github.com/AckeeCZ/petrus/commit/29099a3bcb241990d260efb17b37542b68f996b0)]
-   Update changelog [[3697e77](https://github.com/AckeeCZ/petrus/commit/3697e77d3598585005d018618d5ad7b2dfd65cba)]
-   Update changelog [[d36ab4c](https://github.com/AckeeCZ/petrus/commit/d36ab4c2e96baab74e45462426a84bf00dfdf443)]
-   Add validateTokens utility [[b4b1a22](https://github.com/AckeeCZ/petrus/commit/b4b1a22f7af77c80498174b159595317e1338b22)]
-   Update oAuth doc [[aa0dc21](https://github.com/AckeeCZ/petrus/commit/aa0dc2147d05803d7d1fbe27b6754fc8f2ae1b95)]
-   Rename parseExpirationDate to createExpirationDate [[b151551](https://github.com/AckeeCZ/petrus/commit/b151551565edd7550c0abd1bc4e46d695a81290d)]
-   has expiration prop if it isn&#x27;t undefined (not any falsy value) [[d84b92c](https://github.com/AckeeCZ/petrus/commit/d84b92caba43a6aba0fb644a2bc942904c9627a0)]
-   retrieve tokens with enabled OAuth: take fresh tokens always first [[b6aacee](https://github.com/AckeeCZ/petrus/commit/b6aaceec4a6567e670879504fcee73a031ec9392)]
-   Merge pull request [#23](https://github.com/AckeeCZ/petrus/issues/23) from AckeeCZ/feature/docs [[7603b58](https://github.com/AckeeCZ/petrus/commit/7603b58c406c9606c65c39e773e7dbfb47b3a931)]
-   Update changelog [[6a521a1](https://github.com/AckeeCZ/petrus/commit/6a521a1928aea4c7060abe86ebfb24f5606650e7)]
-   Move documentation to api and oAuth to their own files [[1fb061f](https://github.com/AckeeCZ/petrus/commit/1fb061f10931688cd0cabd57ca823bf422a2ab2f)]

<a name="3.3.2"></a>

## 3.3.2 (2019-02-07)

### Miscellaneous

-   3.3.2 [[462ef45](https://github.com/AckeeCZ/petrus/commit/462ef456815da022a54f6db19fff6064bedf4628)]
-   getAuthUser receives as 1st param tokens [[5e84f9a](https://github.com/AckeeCZ/petrus/commit/5e84f9a51db39ce26b81f0cbfab9827f0952c34a)]

<a name="3.3.1"></a>

## 3.3.1 (2019-02-07)

### Miscellaneous

-   3.3.1 [[78002ce](https://github.com/AckeeCZ/petrus/commit/78002ce16acfee9b30d5ed491fde8dee5cfb89d7)]
-   Add missing export of setUserWithTokens [[7c8a130](https://github.com/AckeeCZ/petrus/commit/7c8a1301ff7067682f43e408c8f178b24d98ac84)]
-   Merge pull request [#22](https://github.com/AckeeCZ/petrus/issues/22) from AckeeCZ/feature/readme [[28f0fef](https://github.com/AckeeCZ/petrus/commit/28f0fef0d4feb7f71ad93e63c6df46cf4d648945)]
-   Update README [[3efbcbd](https://github.com/AckeeCZ/petrus/commit/3efbcbd1a3daaa4ac74174a38648a7fd63253733)]
-   3.3.0 [[ade5504](https://github.com/AckeeCZ/petrus/commit/ade5504eb8d52e5c3de73b4e982661895e3aefa1)]
-   Update CHANGELOG [[f93d75d](https://github.com/AckeeCZ/petrus/commit/f93d75d16698fa292d5857add68443c33e135ac9)]
-   Merge pull request [#21](https://github.com/AckeeCZ/petrus/issues/21) from AckeeCZ/feature/action-types [[18e38e0](https://github.com/AckeeCZ/petrus/commit/18e38e0b74df9edf344ca093a2248db4829a84fd)]
-   Fix eslint errors [[f2f2b25](https://github.com/AckeeCZ/petrus/commit/f2f2b2545979cff7656091d0243837bf837d54f3)]
-   Update CHANGELOG [[1325263](https://github.com/AckeeCZ/petrus/commit/132526333a2006774423ee9ef888a12c9cbeebde)]
-   Add RETRIEVE_TOKENS_REQUEST, RETRIEVE_TOKENS_RESOLVE actions [[072a019](https://github.com/AckeeCZ/petrus/commit/072a0196609b5598616561f68e1007b4fd849950)]
-   Update CHANGELOG.md [[a149e5b](https://github.com/AckeeCZ/petrus/commit/a149e5bb1eaf1bb234a6c7a6c4e2edf1d5f4f3bc)]
-   Update CHANGELOG.md [[dc59171](https://github.com/AckeeCZ/petrus/commit/dc59171e6531c265cf68d8499c2943781a531313)]

<a name="3.2.3"></a>

## 3.2.3 (2019-02-04)

### Miscellaneous

-   3.2.3 [[b6c7017](https://github.com/AckeeCZ/petrus/commit/b6c7017ac0071c022e225029efd0397e7c4bd9d0)]
-   Merge pull request [#19](https://github.com/AckeeCZ/petrus/issues/19) from AckeeCZ/bugfix/oAuth-expiresIn [[8e1b5e4](https://github.com/AckeeCZ/petrus/commit/8e1b5e421aeef486f8fc25f8f55163ffd85b446f)]
-   oAuth#enforceAccessTokenScheme: parse and validate &#x27;expiresIn&#x27; [[f57954d](https://github.com/AckeeCZ/petrus/commit/f57954d340fca3d03348e60d3df9b872c8f75831)]
-   Update CHANGELOG [[70afbb4](https://github.com/AckeeCZ/petrus/commit/70afbb4e729f3f68d9dd9ab16a6f003934302402)]
-   Merge pull request [#18](https://github.com/AckeeCZ/petrus/issues/18) from AckeeCZ/bugfix/oAuth [[23f5a96](https://github.com/AckeeCZ/petrus/commit/23f5a9641efc503304afac3062e02878785c9b9b)]
-   validateOAuth: Fix method names [[4aeb430](https://github.com/AckeeCZ/petrus/commit/4aeb43069343e15f6d976bcd26d9fd0070b25991)]

<a name="3.2.2"></a>

## 3.2.2 (2019-02-01)

### Miscellaneous

-   3.2.2 [[cb852e8](https://github.com/AckeeCZ/petrus/commit/cb852e8331550c36968f252bf056faf1f191d64a)]
-   Fix validateOAuth [[9fac39c](https://github.com/AckeeCZ/petrus/commit/9fac39c3609f34751a0d8f5813156d61627ff9e1)]

<a name="3.2.1"></a>

## 3.2.1 (2019-02-01)

### Miscellaneous

-   3.2.1 [[88e365d](https://github.com/AckeeCZ/petrus/commit/88e365d75af61762846248b288651488beb0c161)]
-   Fix transpilation of selectors.js (caused its unpublishing) [[9f39ae7](https://github.com/AckeeCZ/petrus/commit/9f39ae7dee30511d7ec1e482e36c60c64e2c0ddc)]
-   Remove ls command from travis build recipe [[fc84935](https://github.com/AckeeCZ/petrus/commit/fc849353f208e0ca1b16ec4f4db79bf52c9dae49)]
-   Add listing es directory into travis.yml [[8d4267f](https://github.com/AckeeCZ/petrus/commit/8d4267fafabd3e0b1a80e5f59e3ec8ae85eb44af)]
-   Try to fix unpublishing of selectors.js by replacing &amp; with &amp;&amp; in build command [[8b03869](https://github.com/AckeeCZ/petrus/commit/8b0386962665f33141c7b454ce6bca46450e7477)]

<a name="3.2.0"></a>

## 3.2.0 (2019-02-01)

### Miscellaneous

-   3.2.0 [[cedabe6](https://github.com/AckeeCZ/petrus/commit/cedabe69119fcdda167d07a88bd9d47cc6855c63)]
-   Merge pull request [#15](https://github.com/AckeeCZ/petrus/issues/15) from AckeeCZ/feature/set-user-with-tokens [[1ead8b2](https://github.com/AckeeCZ/petrus/commit/1ead8b26097236b2eb6fcc4738dd9167d6c5d6b6)]
-   Add changelog [[ce4ba89](https://github.com/AckeeCZ/petrus/commit/ce4ba89d10d68014b0149226028a3c91935ea054)]
-   Add setUsetWithTokens action with saga handler [[7ac956e](https://github.com/AckeeCZ/petrus/commit/7ac956e1e16b463ebf48a959e79644f20476ff5f)]

<a name="3.1.2"></a>

## 3.1.2 (2019-01-28)

### Miscellaneous

-   3.1.2 [[7337bd0](https://github.com/AckeeCZ/petrus/commit/7337bd01508de3b4890ed6fb41af94572f5dc3d7)]

<a name="3.1.1"></a>

## 3.1.1 (2019-01-28)

### Miscellaneous

-   3.1.1 [[0569635](https://github.com/AckeeCZ/petrus/commit/056963529c3eb81aa543122df687fc1de937f1c3)]

<a name="3.1.0"></a>

## 3.1.0 (2019-01-25)

### Miscellaneous

-   3.1.0 [[f7f9750](https://github.com/AckeeCZ/petrus/commit/f7f97505df9c91a80bceb9bed2785e8f00fbad6b)]
-   Use camelCase function from lodash instead of custom one [[e43d491](https://github.com/AckeeCZ/petrus/commit/e43d491a739a78d97cc5d6f4a3de9a7b0d8c09d1)]
-   Merge pull request [#13](https://github.com/AckeeCZ/petrus/issues/13) from AckeeCZ/feature/oAuth2 [[d4166bc](https://github.com/AckeeCZ/petrus/commit/d4166bc1843a17410d7a3ce850269a04fa407387)]
-   Fix toCapitalize [[8c4b99d](https://github.com/AckeeCZ/petrus/commit/8c4b99d7f4ac1a75bcaebe14ab6f0e75ac765c5d)]
-   Fix method names [[5cac73b](https://github.com/AckeeCZ/petrus/commit/5cac73b229b7d35709334fb77b56fb1a8a83cf10)]
-   Remove console.log [[b42977f](https://github.com/AckeeCZ/petrus/commit/b42977f71a057216b1a1f26a9741772eba496952)]
-   Update enforeAccessTokenScheme method - expiration must be date string [[b8269d3](https://github.com/AckeeCZ/petrus/commit/b8269d3730f9df034bf8a0dfefad6282cae9a93c)]
-   Use location object [[af05f04](https://github.com/AckeeCZ/petrus/commit/af05f04e511ac6df42b6f7c1726b0536da68df9e)]
-   Fix eslint error [[bfcffe1](https://github.com/AckeeCZ/petrus/commit/bfcffe1f192dfde32461500ce1a5f523897cede9)]
-   Add support for oAuth2 authentication [[a2641c3](https://github.com/AckeeCZ/petrus/commit/a2641c3bf1b965ccc00d09f1d969a9cce2414bc6)]
-   accessTokenAvailable: pass to the action whole accessToken object instead of just the token string [[ec3b3b3](https://github.com/AckeeCZ/petrus/commit/ec3b3b3252dad41505312b6d8be9a383f9b6e7ba)]

<a name="3.0.18"></a>

## 3.0.18 (2019-01-17)

### Miscellaneous

-   3.0.18 [[20497c9](https://github.com/AckeeCZ/petrus/commit/20497c975f41bfc311d8e9edf1778780aedfdb04)]
-   Update build script [[a4a52df](https://github.com/AckeeCZ/petrus/commit/a4a52df0d315d50fea8351d9fd1054bdac0ddfed)]

<a name="3.0.17"></a>

## 3.0.17 (2019-01-17)

### Miscellaneous

-   3.0.17 [[311b3c5](https://github.com/AckeeCZ/petrus/commit/311b3c5302b5a453f21352cbf554d914f5a3680c)]
-   Update build script [[8edaa46](https://github.com/AckeeCZ/petrus/commit/8edaa465c7c3f9b066256dbe8f96e790a05a05cf)]

<a name="3.0.16"></a>

## 3.0.16 (2019-01-17)

### Miscellaneous

-   3.0.16 [[b3aaa04](https://github.com/AckeeCZ/petrus/commit/b3aaa044d96a6da228c47e143906f7baeebe8ba5)]

<a name="3.0.15"></a>

## 3.0.15 (2019-01-17)

### Miscellaneous

-   3.0.15 [[221f73c](https://github.com/AckeeCZ/petrus/commit/221f73c2bd3ded09c28744a91a31b3cdb25a74f5)]
-   Remove yarn.lock [[21a6ab7](https://github.com/AckeeCZ/petrus/commit/21a6ab7b80a1b339a6fbef116f8d2fa9e4eaa410)]

<a name="3.0.14"></a>

## 3.0.14 (2019-01-17)

### Miscellaneous

-   3.0.14 [[bf5fcac](https://github.com/AckeeCZ/petrus/commit/bf5fcac0fdf824fa4632f623053fec4b74d5e60f)]
-   Fix eslint errors [[18b02fa](https://github.com/AckeeCZ/petrus/commit/18b02fafbde60f01321b41045d093e264c77e29c)]

<a name="3.0.13"></a>

## 3.0.13 (2019-01-17)

### Miscellaneous

-   3.0.13 [[d2833c7](https://github.com/AckeeCZ/petrus/commit/d2833c718e0c7acc9890057a4ed70bf712672ec4)]
-   Update devDependencies [[66b47da](https://github.com/AckeeCZ/petrus/commit/66b47dae9cb9088accdcebb40fe8562532662e92)]

<a name="3.0.12"></a>

## 3.0.12 (2019-01-17)

### Miscellaneous

-   3.0.12 [[dd0975b](https://github.com/AckeeCZ/petrus/commit/dd0975b13614c86a3b60124c531b00ff9a319818)]
-   Update start script [[f1d51cf](https://github.com/AckeeCZ/petrus/commit/f1d51cf3b3ef0f23710dfa54568f242617110fe1)]

<a name="3.0.11"></a>

## 3.0.11 (2019-01-17)

### Miscellaneous

-   3.0.11 [[3f4e24e](https://github.com/AckeeCZ/petrus/commit/3f4e24e94c1299c8e7bf918fabd3bc92fe4088ca)]
-   Update READM [[c307685](https://github.com/AckeeCZ/petrus/commit/c307685f5c4ec61c7a2ef12a38416b78e22f61eb)]
-   Merge pull request [#11](https://github.com/AckeeCZ/petrus/issues/11) from AckeeCZ/development [[1cf0322](https://github.com/AckeeCZ/petrus/commit/1cf03221014437a72e1fb103388d1c313a3a7485)]
-   Merge pull request [#10](https://github.com/AckeeCZ/petrus/issues/10) from AckeeCZ/development [[81087e8](https://github.com/AckeeCZ/petrus/commit/81087e887860980e75154cd7e06266561ae29d2a)]
-   Merge pull request [#9](https://github.com/AckeeCZ/petrus/issues/9) from AckeeCZ/development [[d982972](https://github.com/AckeeCZ/petrus/commit/d982972b22a7993d4ed01c8531bf32a5a0266eee)]
-   Merge pull request [#7](https://github.com/AckeeCZ/petrus/issues/7) from AckeeCZ/development [[5bf2150](https://github.com/AckeeCZ/petrus/commit/5bf21509c837775eedd00dde6b5669cc13c5dab8)]

<a name="3.0.10"></a>

## 3.0.10 (2019-01-17)

### Miscellaneous

-   3.0.10 [[877c29e](https://github.com/AckeeCZ/petrus/commit/877c29ef8467d9f1aec6ec9279faf3f5a6e28894)]
-   Update README - change repo image [[928a8e8](https://github.com/AckeeCZ/petrus/commit/928a8e8143c203d896e29a67d6c61f27c471363c)]

<a name="3.0.9"></a>

## 3.0.9 (2019-01-11)

### Miscellaneous

-   3.0.9 [[33b5165](https://github.com/AckeeCZ/petrus/commit/33b5165f82a80abc63cc842b9766423e7ef150e3)]
-   Update action types prefix [[519172d](https://github.com/AckeeCZ/petrus/commit/519172d29aa195d2dab5ce50c3fac76385ee0b62)]

<a name="3.0.8"></a>

## 3.0.8 (2018-12-21)

### Miscellaneous

-   3.0.8 [[a74a341](https://github.com/AckeeCZ/petrus/commit/a74a341defe9338c2e3962dca98e5076beee7054)]
-   Fix typo in README [[538a3f4](https://github.com/AckeeCZ/petrus/commit/538a3f41e835f7676481dc9dc0facac40be0902c)]

<a name="3.0.7"></a>

## 3.0.7 (2018-12-20)

### Miscellaneous

-   3.0.7 [[af1667d](https://github.com/AckeeCZ/petrus/commit/af1667d8846a6adfe9e7fd40a882c533c97fb0a3)]
-   Add badges to readme [[ed30289](https://github.com/AckeeCZ/petrus/commit/ed302899c3c4e0eba36ebc3cd977cdcb376f030b)]

<a name="3.0.6"></a>

## 3.0.6 (2018-12-20)

### Miscellaneous

-   3.0.6 [[d42b01f](https://github.com/AckeeCZ/petrus/commit/d42b01f1d65471294e51c4614ea588c29898160e)]
-   Fix api_key in travis config [[735f529](https://github.com/AckeeCZ/petrus/commit/735f529ad9d2b5cc31fe41d95e7b89c7952da713)]

<a name="3.0.5"></a>

## 3.0.5 (2018-12-14)

### Miscellaneous

-   3.0.5 [[0b318b9](https://github.com/AckeeCZ/petrus/commit/0b318b95c088fc59608b199f07550f85d4cca14f)]
-   Update README [[a3dd481](https://github.com/AckeeCZ/petrus/commit/a3dd481dd2de4e6c7124187977fafad813c76525)]
-   Merge pull request [#6](https://github.com/AckeeCZ/petrus/issues/6) from AckeeCZ/development [[7b0b508](https://github.com/AckeeCZ/petrus/commit/7b0b508c4a569fdd4aa7f03ccc980145913712a4)]
-   Merge pull request [#5](https://github.com/AckeeCZ/petrus/issues/5) from AckeeCZ/bugifx/set-tokens-persistence [[17ef77e](https://github.com/AckeeCZ/petrus/commit/17ef77ecc3c7096926d8e8b44c6bba6429cbea75)]
-   Merge pull request [#3](https://github.com/AckeeCZ/petrus/issues/3) from AckeeCZ/development [[a370979](https://github.com/AckeeCZ/petrus/commit/a370979b84bff0874abf2edc76012cab89086cf8)]
-   Merge pull request [#1](https://github.com/AckeeCZ/petrus/issues/1) from AckeeCZ/development [[a49f219](https://github.com/AckeeCZ/petrus/commit/a49f2198fc55595bbe7c87461f0e95bb7caae7cb)]

<a name="3.0.4"></a>

## 3.0.4 (2018-12-13)

### Miscellaneous

-   3.0.4 [[5b728c7](https://github.com/AckeeCZ/petrus/commit/5b728c7615ba0c2a64fb37839163b916591cb73b)]
-   Rename undefined persistance variable to persistence [[fb759fa](https://github.com/AckeeCZ/petrus/commit/fb759fa8d9c8856423c74b9f5c5cc39196fe451a)]
-   Merge pull request [#4](https://github.com/AckeeCZ/petrus/issues/4) from AckeeCZ/bugfix/set-tokens-persistence [[fb57364](https://github.com/AckeeCZ/petrus/commit/fb57364ca0ea749d599271941ca68583c0295ee3)]
-   3.0.3 [[58d460e](https://github.com/AckeeCZ/petrus/commit/58d460ec2ee1d5fed687c6c2d816f223c50a99a4)]
-   Connect setTokensPersistence watcher saga among other sagas [[2fea124](https://github.com/AckeeCZ/petrus/commit/2fea12423723c7ec79ada5bdf0688e1f78def8bd)]
-   Rename setTokensPersistance file to setTokensPersistence [[2df0ee2](https://github.com/AckeeCZ/petrus/commit/2df0ee254414fcb8e0756a518d996812d65073c6)]
-   Merge pull request [#2](https://github.com/AckeeCZ/petrus/issues/2) from AckeeCZ/bugfix/configure [[54dc1c1](https://github.com/AckeeCZ/petrus/commit/54dc1c1e3b387491aace6ffe8d224c8a0f00b174)]

<a name="3.0.2"></a>

## 3.0.2 (2018-12-13)

### Miscellaneous

-   3.0.2 [[a42c7a4](https://github.com/AckeeCZ/petrus/commit/a42c7a43518394f8a76fc9e41421e1b2dd41409a)]
-   Set handlers to the global config [[514dd0a](https://github.com/AckeeCZ/petrus/commit/514dd0a44ccdc724595e635603420df7d1646f09)]
-   3.0.1 [[f4cfd8f](https://github.com/AckeeCZ/petrus/commit/f4cfd8fa48d4c31ddaa7b1c9aa07cb5d89f8937a)]
-   Update README [[416ad68](https://github.com/AckeeCZ/petrus/commit/416ad689a09f94d5505f64e93697c85bd313f40c)]
-   Fix link in the main README [[247ceaa](https://github.com/AckeeCZ/petrus/commit/247ceaacc59c697f68e1d4d2f334d57c825e1738)]
-   Merge branch &#x27;features&#x27; into &#x27;master&#x27; [[563ead8](https://github.com/AckeeCZ/petrus/commit/563ead8456a5ad2502671cafa9e6641b0ad1e3f3)]
-   Add lint script to the start script [[6373998](https://github.com/AckeeCZ/petrus/commit/637399882d4bfc92580048818136a851ca135c89)]
-   Update lint-staged script - run also &#x27;yarn lint&#x27; [[952a962](https://github.com/AckeeCZ/petrus/commit/952a962ce27265903821d618bb91d06960065268)]
-   3.0.0 [[f9fd524](https://github.com/AckeeCZ/petrus/commit/f9fd524c2f3042de833da2bf7900c12663bebfa2)]
-   Add travis config [[144ef55](https://github.com/AckeeCZ/petrus/commit/144ef5532a49cf320982811c856cb38aa6425e1b)]
-   Add support for passing custom initialState, setting up custom reducer key [[fe7779d](https://github.com/AckeeCZ/petrus/commit/fe7779d41ecbf6281a9d4f121c53144a01323802)]
-   Remove deprecated authorizedFn saga [[fdf750d](https://github.com/AckeeCZ/petrus/commit/fdf750d4517ed8181306dd55861ef8c4b7701f76)]
-   Use react-display-name instead of custom utility [[5d80308](https://github.com/AckeeCZ/petrus/commit/5d80308c96b5f0321e337b1d4232d24dd9f9a7e6)]
-   Add support for changing tokens persistence dynamically [[0a7b558](https://github.com/AckeeCZ/petrus/commit/0a7b55844b1d783f7d8d027919b6a6549d4c45cd)]
-   Add prettier ignore file [[eeda1e8](https://github.com/AckeeCZ/petrus/commit/eeda1e820f10eb0e664d764673e0f697db1778bb)]
-   2.2.9 [[2dc8226](https://github.com/AckeeCZ/petrus/commit/2dc8226ea629ab65c728290ea626644834959825)]
-   Update .npmignore [[01eb589](https://github.com/AckeeCZ/petrus/commit/01eb589abdae7e0a3816d26049928636638e26d2)]
-   Add prettier script [[6f6c9ed](https://github.com/AckeeCZ/petrus/commit/6f6c9ed92614dd958a8ee3980dbbae5dccf5b3d4)]
-   start script: Update glob pattern to include also jsx files [[4187250](https://github.com/AckeeCZ/petrus/commit/4187250205463f2f0fb97deddf788d0230e099ac)]
-   2.2.8 [[c57373b](https://github.com/AckeeCZ/petrus/commit/c57373b3219bb1933fdeade35819686df3af6a5b)]
-   Fix authorizable - show loader if auth user is fetching [[1d35fee](https://github.com/AckeeCZ/petrus/commit/1d35fee061fc4e83224c680d24b4b5cda87b670b)]
-   2.2.7 [[cf57c62](https://github.com/AckeeCZ/petrus/commit/cf57c62046db267e905f1175c1315c0e8e662aa1)]
-   Update babel config [[c8e3c08](https://github.com/AckeeCZ/petrus/commit/c8e3c0881c4ffdbdd0a4fd242a264bd75a625f83)]
-   Delete package-lock.json [[156a065](https://github.com/AckeeCZ/petrus/commit/156a06589aa5a506882672aa1c39cb19ffd6b640)]
-   2.2.2 [[98d1e06](https://github.com/AckeeCZ/petrus/commit/98d1e06441d7be208f6f104f5515af8421ff0f6c)]
-   Update authorizable - Render AuthorizableComponent only if auth user is fetched [[a130acd](https://github.com/AckeeCZ/petrus/commit/a130acdcc9b51e034c5f0239a43eee6267d055ae)]
-   Merge branch &#x27;feature-authorizable&#x27; into &#x27;master&#x27; [[12efee3](https://github.com/AckeeCZ/petrus/commit/12efee36cb976c68462316bc1242fb768dbb22bf)]
-   2.2.1 [[f4a250d](https://github.com/AckeeCZ/petrus/commit/f4a250d470a9d9a27df5f3018f5bc6021e410e13)]
-   Add authorizable to the main README [[3e87bfc](https://github.com/AckeeCZ/petrus/commit/3e87bfc0f590fcf3f09995fff420248e512254e4)]
-   2.2.0 [[0d68172](https://github.com/AckeeCZ/petrus/commit/0d68172ec7cddf9ec0616796e967b96640037ab0)]
-   Add authorizable HOC [[b8760d9](https://github.com/AckeeCZ/petrus/commit/b8760d92b0f8464fbe4d03b9243172b06c488cda)]
-   Add triedToRetrieveTokens flag to the reducer [[c1d1d23](https://github.com/AckeeCZ/petrus/commit/c1d1d23e03aa75cc52e19128c3177ba1d9a0c6cf)]
-   Clear tokens also when AUTH_REFRESH_TOKEN_FAILURE occurs [[61ce6d9](https://github.com/AckeeCZ/petrus/commit/61ce6d947ad3bb9d2c3e85818b99c500236978d0)]
-   Remove webpack (no umd target will be supported anymore) [[c8d2977](https://github.com/AckeeCZ/petrus/commit/c8d297752077491dc706584b4706f6a2f103f2d1)]
-   Add npmignore [[51c9a7f](https://github.com/AckeeCZ/petrus/commit/51c9a7f63ec58c5ed37a7beb1e22b98f6ff30ae9)]
-   Merge branch &#x27;bugfix-invalid-tokens-retrieval&#x27; into &#x27;master&#x27; [[8b9564a](https://github.com/AckeeCZ/petrus/commit/8b9564a83e6e84d91d0eef39644244161df3eea3)]
-   2.1.0 [[843cbec](https://github.com/AckeeCZ/petrus/commit/843cbec04645303aff515ac46c4f9a2ea594a676)]
-   Update description of available actions for the authStateChannel [[109c108](https://github.com/AckeeCZ/petrus/commit/109c108f2f2ec6e649830baef3d2e405d6843481)]
-   Update tokens saga [[abd27d6](https://github.com/AckeeCZ/petrus/commit/abd27d65364e73692a153d009d02d35389efe9bd)]
-   Do not throw error from fetchAuthUser, sice it aborts other sagas [[e294eee](https://github.com/AckeeCZ/petrus/commit/e294eeecb7eaa1e3edabbe25cbfe804ea3ebb42e)]
-   2.0.2 [[797f35b](https://github.com/AckeeCZ/petrus/commit/797f35b7c92dee711f22c94db662a1058a109d38)]
-   Update triggers of AUTH_SESSION_END and ACCESS_TOKEN_UNVAILABLE [[d244294](https://github.com/AckeeCZ/petrus/commit/d244294455e618d77bafeb509de997609786d28c)]
-   Clear up old build before creating new one [[85c4c8c](https://github.com/AckeeCZ/petrus/commit/85c4c8c6ae2afed531d86e03a8b5c469cb952f4a)]
-   2.0.1 [[f9c32b1](https://github.com/AckeeCZ/petrus/commit/f9c32b19e19e24b04741821ba67f881257f28569)]
-   Fix link in README [[fcbd5ba](https://github.com/AckeeCZ/petrus/commit/fcbd5bacffd058f37643034f32d2ab495ad72abc)]
-   Update README [[5a44fe4](https://github.com/AckeeCZ/petrus/commit/5a44fe4864c5843f091da6ef06b845ccc482a5d2)]
-   2.0.0 [[a7c6188](https://github.com/AckeeCZ/petrus/commit/a7c61889ada0445a35f17d0a360c6f8eac131e90)]
-   1.1.2 [[3ce0ab3](https://github.com/AckeeCZ/petrus/commit/3ce0ab3088f9abc2455c663f9a01020e704f7cf9)]
-   Fix typo in README file [[d28d93e](https://github.com/AckeeCZ/petrus/commit/d28d93ec200e827d255ac44ef9ad47e06059581a)]
-   Merge branch &#x27;feature-readme-2&#x27; into &#x27;master&#x27; [[86fc235](https://github.com/AckeeCZ/petrus/commit/86fc235a573f10014f90ed82d3ca6e72a95297dc)]
-   Fix links in the README [[8b5fb7c](https://github.com/AckeeCZ/petrus/commit/8b5fb7ccaea5b58a04c8ff25e55c5a57fe21b079)]
-   Merge branch &#x27;feature-readme&#x27; into &#x27;master&#x27; [[fb3db09](https://github.com/AckeeCZ/petrus/commit/fb3db097d877839910b33ff69fbc76c3a07ebc11)]
-   1.1.1 [[51f0b8f](https://github.com/AckeeCZ/petrus/commit/51f0b8fdb7c906cb4c2ffab4760e75860c0be67d)]
-   Update README to be up-to-date with the new featuers [[8175d98](https://github.com/AckeeCZ/petrus/commit/8175d983d540d9bff61bf1531355dbb01329b4d9)]
-   Merge branch &#x27;feature-tokens&#x27; into &#x27;master&#x27; [[13a5fc1](https://github.com/AckeeCZ/petrus/commit/13a5fc1f1091e6e9fa0b9e65e3b7bcd103f5cc04)]
-   Add LICENSE [[b35f26b](https://github.com/AckeeCZ/petrus/commit/b35f26bbc3fb094a226c4c7d537ab84cb6c9dce5)]
-   authState/circuits: Fix jsdoc params [[33b369d](https://github.com/AckeeCZ/petrus/commit/33b369dc40753e91c473017c6ad2c53633d303e1)]
-   Update authState circuits [[ec61490](https://github.com/AckeeCZ/petrus/commit/ec614901e320c416e3a5f01fd743f0da835ca33e)]
-   Update circuits docs [[06b3519](https://github.com/AckeeCZ/petrus/commit/06b3519cb20c414ff9f6a886270482f7b9b19eca)]
-   processTokenRefresh: rename named export (to prevent collision with the default one) [[d7734bf](https://github.com/AckeeCZ/petrus/commit/d7734bf58110f4daffa9b930e97dd19650f04ab5)]
-   Fix deepCircuit - slice correctly intermediate units [[b82fa91](https://github.com/AckeeCZ/petrus/commit/b82fa9143ac1e2cd408f8a4c034545e5919c9a58)]
-   Update error for getAuthUser [[d343e07](https://github.com/AckeeCZ/petrus/commit/d343e07cc8aad2e5e7a16c1c9fd5e96635c81309)]
-   Fix authorizedFn - import processTokenRefresh function [[ad24169](https://github.com/AckeeCZ/petrus/commit/ad2416910d9833e306c7d432327c8fd810cdbb28)]
-   Add circuits readme [[738ac69](https://github.com/AckeeCZ/petrus/commit/738ac699ab43040fac0e19774c3bbb4b6ccb468a)]
-   authState: use actionChannel instead of classic channel [[e3587d2](https://github.com/AckeeCZ/petrus/commit/e3587d29eb21c2a871436c9934cf2740a8839f70)]
-   Merge statuses with actions [[6303c08](https://github.com/AckeeCZ/petrus/commit/6303c08e979cdc5f348641e908d7c19c586d0aba)]
-   Fix main imports to be backwards compatible [[5b2b5d8](https://github.com/AckeeCZ/petrus/commit/5b2b5d86960d2a00bedad0fcfd89e20188ddd134)]
-   Update fetchAuthUser - prevent multiple duplicit requests [[3083e0e](https://github.com/AckeeCZ/petrus/commit/3083e0e8028353facef7adeb1855dcfe362af226)]
-   Fix refreshing expired tokens after retrieval [[67c3a84](https://github.com/AckeeCZ/petrus/commit/67c3a8457bbb80e412289164f2847c927ee49622)]
-   Update action types - add to each type package prefix [[59911f1](https://github.com/AckeeCZ/petrus/commit/59911f158175e2dbb2576f7d57837c8fc5b6c284)]
-   Fix retrieving tokens [[af9070b](https://github.com/AckeeCZ/petrus/commit/af9070b33e05532158ed257662904b133bcd63a5)]
-   Add onchange package - run build:es when a file changes [[1f6110c](https://github.com/AckeeCZ/petrus/commit/1f6110c384404285f91f4068d3c29a0d72f662f1)]
-   1.1.0 [[5b39341](https://github.com/AckeeCZ/petrus/commit/5b39341938e71ee823506f1c55c16926e526f76a)]
-   Update webpack 4.x, babel-loader 8.x, babel 7.x [[41f23f3](https://github.com/AckeeCZ/petrus/commit/41f23f37c3527d266a6a65245cca55a75a99a174)]
-   Fix eslint errors [[4aa06ca](https://github.com/AckeeCZ/petrus/commit/4aa06ca3b71d4adb033522ca30002515d89fbd3a)]
-   Add sagas for auto refreshing tokens and add tokens persistance option [[5e363e0](https://github.com/AckeeCZ/petrus/commit/5e363e00cbf7ff792140f45a91d1976eb7ad8fbe)]
-   Add authStateChannel [[911bb72](https://github.com/AckeeCZ/petrus/commit/911bb72af207496a3d234c4d4848dbb408d7f1b9)]
-   Add statuses - actions for redux saga channels [[cf5a436](https://github.com/AckeeCZ/petrus/commit/cf5a4364a08e5c86861a70d706720ccb2f472d2d)]
-   Divide current saga into separated files - authorizedFn, configure, handlerLogin, processTokenRefresh [[61c4b57](https://github.com/AckeeCZ/petrus/commit/61c4b578abe6bf2999a75849002cc608685e6fb6)]
-   Add constants file with available persistance options for tokens [[41757b2](https://github.com/AckeeCZ/petrus/commit/41757b2f355afc1844442e7d2edc2424e1ab7c89)]
-   Add Redux files for fetching auth user [[13d64ef](https://github.com/AckeeCZ/petrus/commit/13d64efab208d51d0c940d9fdc0f331d8a525dec)]
-   Add prettier config [[ee55564](https://github.com/AckeeCZ/petrus/commit/ee555646f61fc4366e5f7c5e197a063ad455cb67)]
-   Version 1.0.1 [[07a270a](https://github.com/AckeeCZ/petrus/commit/07a270a3ce4347e0f35336dd65ecefd4952a1743)]
-   Merge branch &#x27;feature/login-error-warning&#x27; into &#x27;master&#x27; [[461a8bb](https://github.com/AckeeCZ/petrus/commit/461a8bbd8b3ec50c46596d9b784b287277a64eb1)]
-   Change log from error to warn when login fails. [[27e724c](https://github.com/AckeeCZ/petrus/commit/27e724cb9cdc7a4ec686a93c30870db25e8998b1)]
-   Merge branch &#x27;task-publish&#x27; into &#x27;master&#x27; [[08a68fe](https://github.com/AckeeCZ/petrus/commit/08a68fee29c4711d682cf403da61e58a141bce82)]
-   fix repository url [[5e5459c](https://github.com/AckeeCZ/petrus/commit/5e5459c7b3b3f7b123a75922813b34879caafa85)]
-   Merge branch &#x27;task-publish&#x27; into &#x27;master&#x27; [[1fdd7b5](https://github.com/AckeeCZ/petrus/commit/1fdd7b50f9aeea75c18a799f521957ec220ce261)]
-   Merge branch &#x27;task-rewrite&#x27; into &#x27;master&#x27; [[63a4316](https://github.com/AckeeCZ/petrus/commit/63a43169dc8442129d21633cab7efcf78b17f35d)]
-   add Lukas Horak to contributors [[0dae087](https://github.com/AckeeCZ/petrus/commit/0dae08794b753a6fbd08fdabd6475c7ca5dbce5f)]
-   publish settings [[6c3194c](https://github.com/AckeeCZ/petrus/commit/6c3194cb551e50f2efe6682d878d9338395bf7b3)]
-   fix readme project name [[f788d87](https://github.com/AckeeCZ/petrus/commit/f788d8747d8dd27aff75f968eb5ba1024d1406d1)]
-   fix readme [[1e78ff7](https://github.com/AckeeCZ/petrus/commit/1e78ff7ae6b2fc9c35dd5147b48209bec495b0c6)]
-   add eslint [[e3b7282](https://github.com/AckeeCZ/petrus/commit/e3b7282077cf6e2f77eae3005b7c323591721daa)]
-   fix webpack entry [[e4b0c82](https://github.com/AckeeCZ/petrus/commit/e4b0c8218633d3895381192864d73d322cd25d80)]
-   add build to gitignore [[a689608](https://github.com/AckeeCZ/petrus/commit/a6896089d11015ca6ec33385b5215a4609bb8595)]
-   remove build from git [[08c07da](https://github.com/AckeeCZ/petrus/commit/08c07dab3cce9591b9bda155febd1895c50c9862)]
-   refactored project structure [[777695e](https://github.com/AckeeCZ/petrus/commit/777695e22d44ec317c33d9617e555e068dec9040)]
-   Update readme [[21854dc](https://github.com/AckeeCZ/petrus/commit/21854dc1e4f912abd2ad1b8689785211482e03f3)]
-   Merge pull request [#3](https://github.com/AckeeCZ/petrus/issues/3) from horaklukas/feature-better-package-build [[c1e9ef0](https://github.com/AckeeCZ/petrus/commit/c1e9ef0cb1dab870fc03dc22367872e228263e56)]
-   Add compilation source code without bundling it (modules and cjs environment) [[10922fa](https://github.com/AckeeCZ/petrus/commit/10922fad0d0b4b735469624988d9986663a9d78c)]
-   export stoplogin aa [[12325e7](https://github.com/AckeeCZ/petrus/commit/12325e799833bbd3273211b43cb15c70581aaa91)]
-   export action types [[2e1922f](https://github.com/AckeeCZ/petrus/commit/2e1922fa20b1cab088ac2274d264dab2ce445b32)]
-   expose refresh tokens action creator [[d2dcd22](https://github.com/AckeeCZ/petrus/commit/d2dcd229faa843c1f340a40f4082e476004862a7)]
-   export selectors, fix isloggingin selector [[79afe3a](https://github.com/AckeeCZ/petrus/commit/79afe3a7dd670216a3cf35f9994230f6f7845997)]
-   Update configuration and refresh token resolution [[b305aa9](https://github.com/AckeeCZ/petrus/commit/b305aa92d31b811a94df1e66e5f04fe6a48a0a70)]
-   Refactor types and actions [[934ff17](https://github.com/AckeeCZ/petrus/commit/934ff17938dd260d711f897cdc0046da70855f78)]
-   Fix module bundling [[8ba861a](https://github.com/AckeeCZ/petrus/commit/8ba861a064c50a9628b77a15562e660e4a857261)]
-   Bundle as umd module [[4afc452](https://github.com/AckeeCZ/petrus/commit/4afc45260d96eb9aee6951a900f32c3120010cb3)]
-   Fix bundling [[1280ced](https://github.com/AckeeCZ/petrus/commit/1280ced63ba0b663e234f2342b7ab40dfb7c87cd)]
-   Fix regenerator runtime not defined [[9b0af44](https://github.com/AckeeCZ/petrus/commit/9b0af4474186b4894c6cdb42210858841717cb17)]
-   Fix require path [[43338da](https://github.com/AckeeCZ/petrus/commit/43338daef9028104e3d1e8f9e85d7ecf1df3cf23)]
-   Add webpack transpilation [[d67646c](https://github.com/AckeeCZ/petrus/commit/d67646cca15f41d447656587941a768bbb84d09d)]
-   cleanup [[878b05f](https://github.com/AckeeCZ/petrus/commit/878b05fda674e3aa05d882bd61fc05616a59a1e9)]
-   Initial commit [[dcc4a90](https://github.com/AckeeCZ/petrus/commit/dcc4a90f2ecd409fbf502aca4d1c3966d9fc5c26)]
