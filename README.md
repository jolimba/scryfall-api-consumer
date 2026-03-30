# Scryfall API Consumer

A Node.js/TypeScript API that receives natural language card requests and returns random card suggestions from Scryfall.  
The system consists of two parts:  
1. **TypeScript/Express API** – handles incoming requests and queues processing.  
2. **Worker (in progress)** – queries Scryfall and returns matching cards.

---

## Features

- Accepts natural language input like:  
  *“I want a white card that has 'rabbit' in its text and less than 4 power, for my Baylen deck”*  
- Returns up to 10 random cards that match the criteria.  
- Built with **Express**, **BullMQ**, and **Redis** for job queuing.  

## Quick Start

```bash
git clone https://github.com/jolimba/scryfall-api-consumer.git
cd scryfall-api-consumer
docker-compose up -d
```
### Second part is still in progress.
