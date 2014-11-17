class TransactionsController < ApplicationController

    def create
      @test = {hi: 'hi'}
      render json: @test
    end
    
end
