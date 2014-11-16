class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.string :title
      t.string :type
      t.float  :amount
      t.string :frequency
      t.string :weeklyDay
      t.string :monthlyDate
      t.date   :start

      t.timestamps
    end
  end
end
