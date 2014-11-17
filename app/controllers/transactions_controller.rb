class TransactionsController < ApplicationController

    def create
      transaction = Hash.new

      transaction[:title] = params[:title]
      transaction[:category] = params[:category]
      transaction[:amount] = params[:amount]
      transaction[:frequency] = params[:frequency]

      transaction[:weeklyDay] = params[:weeklyDay]
      transaction[:monthlyDate] = params[:monthlyDate]
      transaction[:start] = params[:start]
      transaction[:color] = params[:color]

      @transaction = Transaction.create(transaction)

      render json: @transaction
    end

end