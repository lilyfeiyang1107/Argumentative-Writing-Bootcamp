import {test,expect} from '@playwright/test';
test('complete a building, persist reward, and display mobile hall',async({page})=>{
 await page.goto('/');await expect(page.locator('.blueprint')).toHaveCount(6);
 await page.getByRole('button',{name:'开始建造之旅'}).click();
 await page.getByRole('button',{name:'确认拼插'}).click();await expect(page.getByRole('alert')).toBeVisible();
 for(const word of ['网络时代','良好','沟通技巧'])await page.locator('.option').filter({hasText:word}).click();
 await page.getByRole('button',{name:'确认拼插'}).click();
 const opts=page.locator('.option');await opts.nth(1).click();await opts.nth(0).click();
 await page.getByRole('button',{name:'确认拼插'}).click();
 await page.getByRole('button',{name:'魔法透视'}).click();await expect(page.locator('.hinted')).toHaveCount(3);
 for(const index of [0,2,4])await page.locator('.option').nth(index).click();
 await page.getByRole('button',{name:'确认拼插'}).click();
 await page.locator('textarea').fill('因此，人们在网络时代必须有良好的沟通技巧，以适应快捷开放而多样的沟通方式。');
 await page.getByRole('button',{name:'完美封顶',exact:true}).click();await expect(page.getByText('+20 颗发光水晶积木')).toBeVisible();
 await page.getByRole('button',{name:'看看我的城市'}).click();await expect(page.locator('.achievement')).toHaveCount(1);
 await page.reload();await page.getByRole('button',{name:'我的大都会',exact:true}).click();await expect(page.locator('.achievement')).toHaveCount(1);
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'蓝图大厅',exact:true}).click();await expect(page.locator('.blueprint')).toHaveCount(6);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test('import original Word reference and publish six levels',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'进入教师工作台'}).click();
 await page.locator('input[type=file]').setInputFiles('tests/fixtures/reference.docx');
 await expect(page.getByText('成功解析 6 道题目，请检查关键词与论点后发布。')).toBeVisible({timeout:20000});
 await page.getByRole('button',{name:'发布工地'}).click();await expect(page.locator('.blueprint')).toHaveCount(6);
});
