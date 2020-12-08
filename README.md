# Cryptowatch Firehose Test repo

The repo containts a simple client that:

- subscribes to orderbook snapshots on 171 markets
- for each orderbook snapshot prints the id of the market and number of update
		on given market
- exits after 70 seconds
- prints the number of updates received

All you need to do is run this in your shell:

```
$ API_KEY=<YOUR-CW-API-KEY> API_SECRET=<YOUR-CW-SECRET-KEY> make
```

