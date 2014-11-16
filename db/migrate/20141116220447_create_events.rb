class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.string :type
      t.float  :amount
      t.string :frequency
      t.string :weeklyDay
      t.string :monthlyDate
      t.date   :start
    end
  end
end
