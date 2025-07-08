**Greetings, Java Developer!**

My name is Jeffrey, and I'll be your guide today to show you some interesting features of my application. 
Let's go straight to the point, I don't want to waste your time. It's Profile-time!

I'm mainly focused on profiling Java application and JFR recordings. Therefore, I prepared a testing application  
and created a couple JFR profiles to start up quickly with some examples.

## Initial Information

#### Tested Application

- <a href="https://github.com/petrbouda/jeffrey-testapp" style="color: blue">https://github.com/petrbouda/jeffrey-testapp</a>
- simple multi-threaded web application for storing and fetching information about persons 
- the app is full of inefficiencies to have some interesting info in the recording
- database is started as a testcontainer (CockroachDB) directly from the app (to simulation waiting/parking)
- from time to time the application parks itself, stores and loads data from disk and copy it back to DB on a single thread
- there are two recordings:
  - `direct` - JSON is serialized/deserialized directly to/from Java Object
  - `dom` - JSON si serialized/deserialized to JSON DOM (Jackson's JsonNode), then from DOM to Java Object

#### Recording x Profile

- `recording` - a concrete generated JFR file
- `profile` - data under investigation generated from JFR file
  - currently, there is 1:1 relationship between Recording and Profile 
  - in the future, the profile can be just a part of the recording, or merged from several recordings 

#### Primary & Secondary Profiles

- `primary` - the main profile selected at the very beginning (the blue one in the header)
- `secondary` - the profile that is used for differential flamegraphs/sub-second graphs (the grey one in the header)

## Select the right tool for your use-case

There are actually two versions of Jeffrey:

#### <a href="/posts/jeffrey-app-in-examples" style="color: blue">Jeffrey Application</a>

It's a web-based application containing all available features. Run it locally to discover what your recordings hiding from you :) 

#### <a href="/posts/jeffrey-cli-in-examples" style="color: blue">Jeffrey CLI</a>

Useful tool for your terminal to quickly create graphs and analyze your recordings. It generates a single HTML file 
with the graph all needed data to visualize it properly. However, some features are very dynamic and cannot be used in this mode, for example:

- Dynamic searching in Timeseries Graph (it's doable via command-line parameter) is not provided.
- Sub-second Graph cannot automatically generate a Flamegraph. However, it generates a command to generate it from the terminal.