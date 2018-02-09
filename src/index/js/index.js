import CreateProgressBar from './CreateProgressBar'

const bar1 = new CreateProgressBar('sampleProgress1', 'bar1', 400, 10, 255, 0, 0, 255)
bar1.setBar()
bar1.displayBar()
bar1.setCss()

const bar2 = new CreateProgressBar('sampleProgress2', 'bar2', 400, 20, 31, 127, 255, 255)
bar2.setBar()
bar2.displayBar()
bar2.setCss()

const bar3 = new CreateProgressBar('sampleProgress3', 'bar3', 400, 30, 255, 0, 255, 255)
bar3.setBar()
bar3.displayBar()
bar3.setCss()

const bar4 = new CreateProgressBar('sampleProgress4', 'bar4', 100, 10, 0, 200, 0, 255)
bar4.setBar()
bar4.displayBar()
bar4.setCss()