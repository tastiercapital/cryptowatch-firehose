const { StreamClient } = require("cw-sdk-node");

// first 171 active markets on binance as of Dec 8, 2020.
const markets = `1840
628
61468
629
59428
7557
59429
1096
1844
1090
1066
1847
1793
1849
1850
1271
1272
2119
1853
61903
1854
61904
60562
60563
61944
60564
60565
60566
60567
1855
1635
1636
60854
60855
60859
2120
1858
1859
4826
4827
4828
945
1861
1780
1637
61405
61406
61407
1864
2118
60015
60016
61830
60082
60083
60017
61266
61267
61268
1865
622
61882
623
60114
60115
60116
41115
2121
1871
1868
5576
61306
948
11368
11369
11370
5583
1875
1199
1180
61146
61147
61148
61703
61702
2122
1878
1879
1799
61238
1880
61601
61338
5648
61484
50910
6634
29772
2116
942
61784
935
61783
2123
1882
1883
61239
61599
61339
5649
61481
50911
6630
29773
579
610
611
625
61781
1888
61780
29774
61945
29776
61023
29777
29778
29668
61701
61700
61337
61493
61240
1638
1782
59590
59591
59592
61035
61036
61037
2124
1893
1894
1895
1788
1643
61028
61029
61030
60885
60886
60887
61936
61937
61938
61469
61470
61471
1240
1241
60956
59440
607
61831
608
59441
1275
1276
5329
5328`;

const subscriptions = markets
  .split(/\n/)
  .map(strid => parseInt(strid))

console.info(`Subscribing to ${subscriptions.length}`)

const client = new StreamClient({
  creds: {
    apiKey: process.env.API_KEY,
    secretKey: process.env.SECRET_KEY,
  },
  subscriptions: [
	  "pairs:9:book:snapshots",
	  "pairs:231:book:snapshots",
	  "pairs:1556:book:snapshots",
  ],
  logLevel: "debug"
});

var sampleSeconds = 70;
var updates = 0;
var map = {};

// Handlers for market and pair data
client.onMarketUpdate(marketData => {
  updates += 1;
  var marketId = marketData.market.id;
  if (marketId in map) {
    map[marketId] += 1
  } else {
    map[marketId] = 1
  }
  console.log(`${marketId} = ${map[marketId]}`);
});
client.onPairUpdate(pairData => {
  console.log(pairData);
});

// Error handling
client.onError(err => {
  console.error(err);
});

// You can also listen on state changes
client.onStateChange(newState => {
  console.log("connection state changed:", newState);
});

client.onConnect(() => {
  console.info(`streaming data for the next ${sampleSeconds} seconds...`);
  setTimeout(() => {
    console.info(`${updates} updates received`)
    client.disconnect();
  }, sampleSeconds * 1000);
});

client.onDisconnect(() => {
  console.log("done");
});

// Connect to stream
client.connect();

