// import stocksController from "@controllers/stocks.controller";
// import { Response } from "express";
// import { IJResponse } from "src/__interfaces__/jest.interface";
// import stocksGetAll from "../__mocks__/stocks.mock";

// describe('Stocks tests:', () => {
//   const stubRequest = (params: string, body: string /* is an obj */ ) => {
//     return {
//       params: { id: params },
//       body,
//     };
//   };

//   interface Test {
//     status: any,
//     json: any,
//   }

//   const mockResponse = () => {
//     const res = {} as IJResponse;
//       res.status = jest.fn(() => Promise.resolve({ data: res}));
//       res.json = jest.fn();
//     return res;
//   };

//   describe('When query works', () => {

//     test('GET all stocks', async () => {
//       const mockGetAll = jest.spyOn(stocksController, 'getAll').mockResolvedValueOnce();

//       console.log(mockGetAll);
      
//       // expect(mockGetAll).toBe(typeof )
//     })
//   })

//   describe('When query fails', () => {

//   })
// });

// USAR
// SUPERTEST
// PARA
// TESTAR
// A MINHA API

describe('Controller - Stocks:', () => {
  it('Boiler', () => {
    expect(true).toBe(true);
  })
})