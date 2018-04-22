## %% Libraries

library(dplyr)
library(leaflet)

# %% Example Data

states <- data.frame(name = state.name,
                     latitude = state.center$y,
                     longitude = state.center$x,
                     region = state.region)
head(states)

# %% States by Region

regions <- states %>%
  group_by(region) %>%
  summarize(
    meanLat = mean(latitude),
    meanLon = mean(longitude)
  )
regions

## %% Map Regions

leaflet(regions) %>%
  addProviderTiles(providers$CartoDB.Positron) %>%
  addMarkers(lat = ~meanLat, lng = ~meanLon)
