#!/usr/bin/env python # -*- coding: UTF-8 -*-

# importer biopandas via commande
#   pip install biopandas
# marche sur le cremi


from biopandas.pdb import PandasPdb
import os

import matplotlib.pyplot as plt
from matplotlib import style
style.use('ggplot')

cwd = os.getcwd()
liste =[]
# parcours tous les fichiers .pdb et stock les noms dans une liste.
for root, dirs, files in os.walk(cwd):
    for file in files:
        if file.endswith('.pdb'):
            liste.append(file)


sep="."
# genere un objet panda dico a partir du pdb
for i in liste :

	
	
	
	ppdb = PandasPdb().read_pdb(i)
	#enleve le .pdb une fois la lecture du fichier
	i = i.split(sep, 1)[0]
	
	#from IPython import get_ipython
	#get_ipython().run_line_magic('matplotlib', 'inline')


	# genere figure distribution des atoms
	plt.figure(1)
	ppdb.df['ATOM']['element_symbol'].value_counts().plot(kind='bar')
	plt.title('Distribution of Atom Types')
	plt.xlabel('elements')
	plt.ylabel('count')
	
	plt.savefig("distrib_"+str(i)+".png")
	plt.close()

	# generer figure repartition B factors ( mobilité des atoms )
	plt.figure(2)
	ppdb.df['ATOM']['b_factor'].plot(kind='line')
	plt.title('B-Factors Along the Amino Acid Chain')
	plt.xlabel('Residue Number')
	plt.ylabel('B-factor in $A^2$')
	plt.savefig("bfactor_"+str(i)+".png")
	plt.show()
	plt.close()




"""
# BESOIN DAVOIR LE MEME NOMBRE D ATOMES DANS LES 2 PDB A COMPARER
l_1 = PandasPdb().read_pdb('1ag4.pdb')
l_2 = PandasPdb().read_pdb('3a5p.pdb')

r = PandasPdb.rmsd(l_1.df['HETATM'], l_2.df['HETATM'],
                   s=None) # all atoms, including hydrogens
print('RMSD: %.4f Angstrom' % r)
"""
