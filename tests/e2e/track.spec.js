"use strict"

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../src/track')
const { port } = require('../../src/env')

const path = require('path')

chai.use(chaiHttp)

const expect = chai.expect;

describe('rest-tracking (unit)', () => {

    describe('/POST', () => {
        let testFileOne = require('../responses/valid-one.json')
        let testFileTwo = require('../responses/valid-two.json')
        let postObj = {
            "codes":  [ ]
        }

        it('it should POST with valid code', (done) => {
            postObj.codes =  [ "DU897123996BR" ]

            chai.request(`localhost:${port}`)
                .post('/track')
                .send(postObj)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.deep.equal(testFileOne);
                    done();
                });
        });

        it('it should POST with several valid code', (done) => {
            postObj.codes =  [ 'DU897123996BR', 'PN273603577BR' ]

            chai.request(`localhost:${port}`)
                .post('/track')
                .send(postObj)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.deep.equal(testFileTwo);
                    done();
                });
        });

        it('it should POST with invalid code', (done) => {
            postObj.codes =  [ "invalid" ]

            chai.request(`localhost:${port}`)
                .post('/track')
                .send(postObj)
                .end((err, res) => {
                    expect(err).to.not.be.null;
                    expect(res).to.have.status(409);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('code');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('it should POST with nothing', (done) => {
            chai.request(`localhost:${port}`)
                .post('/track')
                .send('')
                .end((err, res) => {
                    expect(err).to.not.be.null;
                    expect(res).to.have.status(409);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('code');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

    });

})
